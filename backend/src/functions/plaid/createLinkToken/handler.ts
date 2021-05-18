import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { CreateLinkTokenOptions } from 'plaid';
import * as aws from 'aws-sdk';
import { Parameter } from 'aws-sdk/clients/ssm';
import { getParameterValue } from '../../../secrets/secrets';
import { createPlaidClient } from '../utils/plaid';
import { EPlaidEnvironment } from 'src/models/plaid';

const ssm = new aws.SSM();

const createLinkToken: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {

  let userId = event.requestContext.authorizer.claims.sub;

  let parameters: Parameter[];
  try {
    let res = await ssm.getParametersByPath({ Path: process.env.PARAMETERS_PATH }).promise();
    parameters = res.Parameters;
  } catch (e) {
    console.log(e)
    return formatJSONResponse(500, null);
  }

  let plaidClient = createPlaidClient({
    client_id: getParameterValue(parameters, process.env.PLAID_CLIENT_ID_PATH),
    secret: getParameterValue(parameters, process.env.PLAID_SECRET_PATH),
    env: <EPlaidEnvironment>getParameterValue(parameters, process.env.PLAID_ENV_PATH),
  });

  const configs: CreateLinkTokenOptions = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: userId,
    },
    client_name: 'WealthTracker',
    language: 'en',
    country_codes: getParameterValue(parameters, process.env.PLAID_COUNTRY_CODES_PATH).split(','),
    products: getParameterValue(parameters, process.env.PLAID_PRODUCTS_PATH).split(','),
  };

  try {
    let createTokenResponse = await plaidClient.createLinkToken(configs)
    return formatJSONResponse(200, { ...createTokenResponse })
  } catch (error) {
    console.log(error)
    return formatJSONResponse(500, null)
  }
}

export const main = middyfy(createLinkToken);
