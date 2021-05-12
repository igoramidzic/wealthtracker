import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as aws from 'aws-sdk';

import schema from './schema';

const getUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  const tableName = process.env.DYNAMODB_USER_TABLE;
  const region = process.env.DYNAMODB_USER_TABLE_REGION;

  aws.config.update({ region });

  var ddb = new aws.DynamoDB.DocumentClient();

  if (!event.requestContext.authorizer.claims) {
    return formatJSONResponse(401, null);
  }

  let userId = event.requestContext.authorizer.claims.sub;

  // // Call DynamoDB
  try {
    let params = {
      Key: {
        id: userId
      },
      TableName: tableName
    };

    let user = await ddb.get(params).promise();
    console.log(user)

    if (user.Item) {
      console.log("Success");
      return formatJSONResponse(200, user.Item);
    } else {
      console.log("User not found")
      return formatJSONResponse(404, { error: 'User not found' });
    }


  } catch (err) {
    console.log("Error", err);
    return formatJSONResponse(500, {});
  }
}

export const main = middyfy(getUser);
