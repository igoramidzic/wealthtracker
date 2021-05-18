import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { createPlaidClient } from '../utils/plaid';
import { getParameterValue } from 'src/secrets/secrets';
import { Parameter } from 'aws-sdk/clients/ssm';
import * as aws from 'aws-sdk';
import { EPlaidEnvironment } from 'src/models/plaid';

const ssm = new aws.SSM();

const getPlaidLinkToken: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {

  // let userId = event.requestContext.authorizer.claims.sub;

  let publicToken: string = <string>(event.body.public_token);

  let parameters: Parameter[];
  try {
    let res = await ssm.getParametersByPath({ Path: process.env.PARAMETERS_PATH }).promise();
    parameters = res.Parameters;
  } catch (e) {
    return formatJSONResponse(500, null);
  }

  let plaidClient = createPlaidClient({
    client_id: getParameterValue(parameters, process.env.PLAID_CLIENT_ID_PATH),
    secret: getParameterValue(parameters, process.env.PLAID_SECRET_PATH),
    env: <EPlaidEnvironment>getParameterValue(parameters, process.env.PLAID_ENV_PATH),
  });

  try {
    let createTokenResponse = await plaidClient.exchangePublicToken(publicToken);
    return formatJSONResponse(200, { ...createTokenResponse })
  } catch (error) {
    return formatJSONResponse(500, { error })
  }
}

export const main = middyfy(getPlaidLinkToken);
