// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'plaid/link/token',
        authorizer: {
          type: 'COGNITO_USER_POOLS',
          authorizerId: {
            Ref: 'userPoolAuthorizer'
          }
        },
        cors: true
      }
    }
  ],
  environment: {
    DYNAMODB_USER_TABLE: '${self:service}-user-${sls:stage}',
    DYNAMODB_USER_TABLE_REGION: 'us-east-2',
    PLAID_ENV: '${env:PLAID_ENV}',
    PLAID_CLIENT_ID: '${env:PLAID_CLIENT_ID}',
    PLAID_SECRET: '${env:PLAID_SECRET}',
    PLAID_PRODUCTS: '${env:PLAID_PRODUCTS}',
    PLAID_COUNTRY_CODES: '${env:PLAID_COUNTRY_CODES}'
  }
}
