import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { getUserFromDynamo } from '../utils/getUserFromDynamo';

const getUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  if (!event.requestContext.authorizer.claims) {
    return formatJSONResponse(401, null);
  }

  let userId = event.requestContext.authorizer.claims.sub;

  // // Call DynamoDB
  try {
    let user = await getUserFromDynamo(userId);

    if (user) {
      console.log("Success");
      return formatJSONResponse(200, { ...user });
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
