import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import * as aws from 'aws-sdk';

const ddb = new aws.DynamoDB.DocumentClient()

const getAccounts: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  if (!event.requestContext.authorizer.claims) {
    return formatJSONResponse(401, null);
  }

  // let userId = event.requestContext.authorizer.claims.sub;
  let userId = '68728214-2cfb-490a-bdc4-98e52c2b15fb';

  // // Call DynamoDB
  try {
    let params = {
      TableName: process.env.ACCOUNT_TABLE,
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId',
      },
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    }

    let data = await ddb.query(params).promise();
    console.log(data);
    return formatJSONResponse(200, { accounts: data.Items });
  } catch (err) {
    console.log("Error", err);
    return formatJSONResponse(500, {});
  }
}

export const main = middyfy(getAccounts);
