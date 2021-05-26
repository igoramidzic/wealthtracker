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
import { createPlaidClient } from '@functions/plaid/utils/plaid';
import { IAccount } from 'src/models/account';
import { Account } from 'plaid';

const ddb = new aws.DynamoDB.DocumentClient()
const ssm = new aws.SSM();

const getBalances: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  let userId = event.requestContext.authorizer.claims.sub;

  console.log(1);
  let parameters: Parameter[];
  try {
    let res = await ssm.getParametersByPath({ Path: process.env.PARAMETERS_PATH }).promise();
    parameters = res.Parameters;
  } catch (e) {
    console.log(e);
    return formatJSONResponse(500, null);
  }

  console.log(2);
  const itemsTableName = getItemsTableName(<EPlaidEnvironment>getParameterValue(parameters, process.env.PLAID_ENV_PATH));

  let itemId: string = <string>(event.body.itemId);
  if (!itemId || typeof itemId != "string")
    return formatJSONResponse(400, { error: 'Invalid itemId provided' });

  let item: IItem;
  try {
    let ddbParams = {
      TableName: itemsTableName,
      Key: {
        userId,
        itemId
      }
    };
    console.log(ddbParams);

    let res = await ddb.get(ddbParams).promise();
    item = <IItem>({ ...res.Item });
    console.log(4);
    if (!res.Item == null)
      return formatJSONResponse(500, null);
  } catch (e) {
    console.log(5);
    console.log(e);
    return formatJSONResponse(500, null);
  }

  let plaidClient = createPlaidClient({
    client_id: getParameterValue(parameters, process.env.PLAID_CLIENT_ID_PATH),
    secret: getParameterValue(parameters, process.env.PLAID_SECRET_PATH),
    env: <EPlaidEnvironment>getParameterValue(parameters, process.env.PLAID_ENV_PATH),
  });

  let accounts: Account[];
  try {
    let res = await plaidClient.getBalance(item.accessToken);
    console.log(6);
    accounts = res.accounts;
  } catch (e) {
    console.log(e);
    console.log(7);
    return formatJSONResponse(500, null);
  }

  let updatedAccounts: IAccount[] = [];

  accounts.forEach(account => {
    updatedAccounts.push({
      accountId: account.account_id,
      balances: {
        current: account.balances.current,
        available: account.balances.available,
        isoCurrencyCode: account.balances.iso_currency_code,
      },
      mask: account.mask,
      name: account.name,
      officialName: account.official_name,
      type: account.type,
      subtype: account.subtype
    })
  });

  var params = {
    TableName: itemsTableName,
    Key: {
      userId,
      itemId
    },
    UpdateExpression: "set accounts = :a",
    ExpressionAttributeValues: {
      ":a": updatedAccounts
    },
    ReturnValues: "UPDATED_NEW"
  };

  console.log(params);

  try {
    await ddb.update(params).promise();
    delete item.accessToken;
    return formatJSONResponse(200, { ...item, accounts: updatedAccounts });
  } catch (e) {
    console.log(e);
    return formatJSONResponse(500, null);
  }

}

export const main = middyfy(getBalances);
