import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as aws from 'aws-sdk';

import schema from './schema';
import { getUserFromDynamo } from '../../user/utils/getUserFromDynamo';
import { IUser } from 'src/models/user';
import { Parameter } from 'aws-sdk/clients/ssm';
import { createPlaidClient } from '@functions/plaid/utils/plaid';
import { getParameterValue } from 'src/secrets/secrets';
import { EPlaidEnvironment } from 'src/models/plaid';
import { IItem } from 'src/models/item';
import { IAccount } from 'src/models/account';
import { AccountsResponse, GetInstitutionByIdResponse, InstitutionWithInstitutionData } from 'plaid';
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

  // First find the user
  let user: IUser;
  try {
    user = await getUserFromDynamo(userId);

    if (!user)
      return formatJSONResponse(500, null);
  } catch (e) {
    console.log(e);
    return formatJSONResponse(500, null);
  }

  // Check if user can create an account
  if (!userCanCreateAnAccount(user))
    return formatJSONResponse(400, { error: "Cannot create an account at this time" });

  let publicToken: string = <string>(event.body.public_token);

  let plaidClient = createPlaidClient({
    client_id: getParameterValue(parameters, process.env.PLAID_CLIENT_ID_PATH),
    secret: getParameterValue(parameters, process.env.PLAID_SECRET_PATH),
    env: <EPlaidEnvironment>getParameterValue(parameters, process.env.PLAID_ENV_PATH),
  });

  let accessToken: string;
  try {
    let tokenResponse = await plaidClient.exchangePublicToken(publicToken);
    accessToken = tokenResponse.access_token;
  } catch (error) {
    console.log(error);
    return formatJSONResponse(500, null)
  }

  let accountsRes: AccountsResponse;
  try {
    accountsRes = await plaidClient.getAccounts(accessToken);
  } catch (e) {
    console.log(e);
    return formatJSONResponse(500, null);
  }

  let institution: InstitutionWithInstitutionData;
  try {
    let institutionRes = <GetInstitutionByIdResponse<InstitutionWithInstitutionData>>(await plaidClient.getInstitutionById(accountsRes.item.institution_id,
      getParameterValue(parameters, process.env.PLAID_COUNTRY_CODES_PATH).split(','), {
      include_optional_metadata: true
    }))

    institution = institutionRes.institution;
    console.log(institution)
  } catch (e) {
    console.log(e);
    return formatJSONResponse(500, null);
  }

  let accounts: IAccount[] = [];

  accountsRes.accounts.forEach(account => {
    accounts.push({
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

  let item: IItem = {
    userId,
    itemId: accountsRes.item.item_id,
    accessToken: accessToken,
    accounts,
    institution: {
      id: institution.institution_id,
      name: institution.name,
    },
    createdAt: new Date().toISOString()
  }

  try {
    let ddbParams = {
      Item: item,
      TableName: itemsTableName
    };

    await ddb.put(ddbParams).promise();

    delete item.accessToken;
    return formatJSONResponse(200, { ...item });
  } catch (err) {
    console.log("Error", err);
    return formatJSONResponse(500, null);
  }
}

const userCanCreateAnAccount = (user: IUser): boolean => {
  return user.onboarding.completed;
}

export const main = middyfy(addItem);
