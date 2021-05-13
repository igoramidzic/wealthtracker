import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { CreateLinkTokenOptions } from 'plaid';
import { plaidClient, PLAID_COUNTRY_CODES, PLAID_PRODUCTS } from '../utils/plaid';

const exchangePublicToken: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {

  let userId = event.requestContext.authorizer.claims.sub;

  const configs: CreateLinkTokenOptions = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: userId,
    },
    client_name: 'WealthTracker',
    language: 'en',
    country_codes: PLAID_COUNTRY_CODES,
    products: PLAID_PRODUCTS
  };

  try {
    let createTokenResponse = await plaidClient.createLinkToken(configs)
    return formatJSONResponse(200, { ...createTokenResponse })
  } catch (error) {
    return formatJSONResponse(500, { error })
  }
}

export const main = middyfy(exchangePublicToken);
