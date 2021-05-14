// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'accounts',
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
    ACCOUNT_TABLE: '${self:custom.environment.ACCOUNT_TABLE}',
    REGION: '${self:provider.region}'
  }
}
