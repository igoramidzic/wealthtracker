import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { plaidClient } from '../utils/plaid';

const getPlaidLinkToken: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {

  // let userId = event.requestContext.authorizer.claims.sub;

  let publicToken: string = <string>(event.body.public_token);

  try {
    let createTokenResponse = await plaidClient.exchangePublicToken(publicToken);
    return formatJSONResponse(200, { ...createTokenResponse })
  } catch (error) {
    return formatJSONResponse(500, { error })
  }
}

export const main = middyfy(getPlaidLinkToken);
