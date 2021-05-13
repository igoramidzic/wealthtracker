import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { formatJSONResponse } from '../../../libs/apiGateway';

const getPlaidLinkToken = async (event, context) => {
  console.log(event);

  return formatJSONResponse(200, {});
};

export const main = middyfy(getPlaidLinkToken);