import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as aws from 'aws-sdk';

import schema from './schema';
import { Parameter } from 'aws-sdk/clients/ssm';
import { createPlaidClient } from '@functions/plaid/utils/plaid';
import { getParameterValue } from 'src/secrets/secrets';
import { EPlaidEnvironment } from 'src/models/plaid';
import { IItem } from 'src/models/item';
import { getItemsTableName } from '@functions/plaid/utils/item_table_env';

var ddb = new aws.DynamoDB.DocumentClient();
var ssm = new aws.SSM();

const addItem: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {

  let parameters: Parameter[];
  try {
    let res = await ssm.getParametersByPath({ Path: process.env.PARAMETERS_PATH }).promise();
    parameters = res.Parameters;
  } catch (e) {
    console.log(e);
    return formatJSONResponse(500, null);
  }

  const region = process.env.REGION;

  const itemsTableName = getItemsTableName(<EPlaidEnvironment>getParameterValue(parameters, process.env.PLAID_ENV_PATH))

  aws.config.update({ region });

  let userId = event.requestContext.authorizer.claims.sub;
  let itemId: string = <string>(event.body.itemId);

  let item: IItem;
  try {
    let ddbParams = {
      TableName: itemsTableName,
      Key: {
        userId,
        itemId
      },
      ReturnValues: 'ALL_OLD'
    };

    let res = await ddb.delete(ddbParams).promise();
    item = <IItem>({ ...res.Attributes });
  } catch (e) {
    console.log(e);
    return formatJSONResponse(500, null);
  }

  let plaidClient = createPlaidClient({
    client_id: getParameterValue(parameters, process.env.PLAID_CLIENT_ID_PATH),
    secret: getParameterValue(parameters, process.env.PLAID_SECRET_PATH),
    env: <EPlaidEnvironment>getParameterValue(parameters, process.env.PLAID_ENV_PATH),
  });

  try {
    let res = await plaidClient.removeItem(item.accessToken);
    console.log(res);
    delete item.accounts;
    delete item.accessToken;
    return formatJSONResponse(200, { ...item })
  } catch (e) {
    console.log(e);
    return formatJSONResponse(500, null);
  }
}

export const main = middyfy(addItem);
