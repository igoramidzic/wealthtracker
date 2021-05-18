import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import * as aws from 'aws-sdk';
import { IItem } from 'src/models/item';
import { getItemsTableName } from '@functions/plaid/utils/item_table_env';
import { EPlaidEnvironment } from 'src/models/plaid';
import { getParameterValue } from 'src/secrets/secrets';
import { Parameter } from 'aws-sdk/clients/ssm';

const ddb = new aws.DynamoDB.DocumentClient()
const ssm = new aws.SSM();

const getItems: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  let userId = event.requestContext.authorizer.claims.sub;

  let parameters: Parameter[];
  try {
    let res = await ssm.getParametersByPath({ Path: process.env.PARAMETERS_PATH }).promise();
    parameters = res.Parameters;
  } catch (e) {
    console.log(e);
    return formatJSONResponse(500, null);
  }

  const itemsTableName = getItemsTableName(<EPlaidEnvironment>getParameterValue(parameters, process.env.PLAID_ENV_PATH))

  // // Call DynamoDB
  try {
    let params = {
      TableName: itemsTableName,
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId',
      },
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    }

    let res = await ddb.query(params).promise();
    let items: IItem[] = <IItem[]>res.Items;

    items.forEach(item => {
      delete item.accessToken;
    });

    return formatJSONResponse(200, { items });
  } catch (err) {
    console.log("Error", err);
    return formatJSONResponse(500, null);
  }
}

export const main = middyfy(getItems);
