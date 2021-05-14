import 'source-map-support/register';

import { PostConfirmationConfirmSignUpTriggerEvent } from 'aws-lambda';

import * as aws from 'aws-sdk';
import { middyfy } from '@libs/lambda';
var ddb = new aws.DynamoDB.DocumentClient();

const createUserOnSignUp = async (event: PostConfirmationConfirmSignUpTriggerEvent, context) => {
  console.log(event);

  let date = new Date();

  const tableName = process.env.USER_TABLE;
  const region = process.env.REGION;

  aws.config.update({ region: region });

  // If the required parameters are present, proceed
  if (event.request.userAttributes.sub) {

    // -- Write data to DDB
    let ddbParams = {
      Item: {
        id: event.request.userAttributes.sub,
        name: event.request.userAttributes.name,
        onboarding: {
          completed: false,
        },
        email: event.request.userAttributes.email,
        createdAt: date.toISOString(),
      },
      TableName: tableName
    };

    // Call DynamoDB
    try {
      await ddb.put(ddbParams).promise()
      console.log("Success");
    } catch (err) {
      console.log("Error", err);
    }

    console.log("Success: Everything executed correctly");
    context.done(null, event);

  } else {
    // Nothing to do, the user's email ID is unknown
    console.log("Error: Nothing was written to DDB or SQS");
    context.done(null, event);
  }
};

export const main = middyfy(createUserOnSignUp);