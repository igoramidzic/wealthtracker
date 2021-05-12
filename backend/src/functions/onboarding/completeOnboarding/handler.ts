import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as aws from 'aws-sdk';

import schema from './schema';

const completeOnboarding: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  const tableName = process.env.DYNAMODB_USER_TABLE;
  const region = process.env.DYNAMODB_USER_TABLE_REGION;

  aws.config.update({ region });

  var ddb = new aws.DynamoDB.DocumentClient();

  if (!event.requestContext.authorizer.claims) {
    return formatJSONResponse(401, null);
  }

  let userId = event.requestContext.authorizer.claims.sub;

  try {
    let item = {
      id: userId,
      onboarding: {
        completed: true
      }
    }
    let params = createUpdateParams(tableName, item, "id");

    let user = await ddb.update(params).promise();

    console.log(user)

    if (user.Attributes) {
      console.log("Success");
      return formatJSONResponse(200, user.Attributes);
    } else {
      console.log("User not found")
      return formatJSONResponse(404, { error: 'User not found' });
    }


  } catch (err) {
    console.log("Error", err);
    return formatJSONResponse(500, {});
  }
}

function createUpdateParams(tableName: string, item: any, idAttributeName: string): aws.DynamoDB.DocumentClient.UpdateItemInput {

  var params = {
    TableName: tableName,
    Key: {},
    ExpressionAttributeValues: {},
    ExpressionAttributeNames: {},
    UpdateExpression: "",
    ReturnValues: "UPDATED_NEW"
  };

  params["Key"][idAttributeName] = item[idAttributeName];

  let prefix = "set ";
  let attributes = Object.keys(item);
  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i];
    if (attribute != idAttributeName) {
      params["UpdateExpression"] += prefix + "#" + attribute + " = :" + attribute;
      params["ExpressionAttributeValues"][":" + attribute] = item[attribute];
      params["ExpressionAttributeNames"]["#" + attribute] = attribute;
      prefix = ", ";
    }
  }

  return params;
}

export const main = middyfy(completeOnboarding);
