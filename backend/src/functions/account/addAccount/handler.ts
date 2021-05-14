import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { v4 as uuidv4 } from 'uuid';
import * as aws from 'aws-sdk';

import schema from './schema';
import { getUserFromDynamo } from '../../user/utils/getUserFromDynamo';
import { IUser } from 'src/models/user';
import { IAccount } from 'src/models/account';
import { plaidClient } from '@functions/plaid/utils/plaid';
import { TokenResponse } from 'plaid';

var ddb = new aws.DynamoDB.DocumentClient();

const addAccount: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  const accountTableName = process.env.ACCOUNT_TABLE;
  const region = process.env.REGION;

  aws.config.update({ region });

  // let userId = event.requestContext.authorizer.claims.sub;
  let userId = '68728214-2cfb-490a-bdc4-98e52c2b15fb';

  // First find the user
  let user: IUser;
  try {
    user = await getUserFromDynamo(userId);

    if (!user)
      return formatJSONResponse(500, null);
  } catch (e) {
    return formatJSONResponse(500, null);
  }

  // Check if user can create an account
  if (!userCanCreateAnAccount(user))
    return formatJSONResponse(400, { error: "Cannot create an account at this time" });

  let publicToken: string = <string>(event.body.public_token);

  let createTokenResponse: TokenResponse;
  try {
    createTokenResponse = await plaidClient.exchangePublicToken(publicToken);
  } catch (error) {
    return formatJSONResponse(500, { error })
  }

  try {
    let account: IAccount = {
      accountId: uuidv4(),
      userId,
      mask: 1234,
      itemId: createTokenResponse.item_id,
      accessToken: createTokenResponse.access_token,
      createdAt: new Date().toISOString(),
    };

    let ddbParams = {
      Item: account,
      TableName: accountTableName
    };

    console.log(account)
    await ddb.put(ddbParams).promise();
    return formatJSONResponse(200, { ...account });
  } catch (err) {
    console.log("Error", err);
    return formatJSONResponse(500, {});
  }
}

const userCanCreateAnAccount = (user: IUser): boolean => {
  return user.onboarding.completed;
}

export const main = middyfy(addAccount);
