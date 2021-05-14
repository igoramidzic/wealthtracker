// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';
// import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'account',
        // request: {
        //   schema: {
        //     'application/json': schema
        //   }
        // },
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
    USER_TABLE: '${self:custom.environment.USER_TABLE}',
    ACCOUNT_TABLE: '${self:custom.environment.ACCOUNT_TABLE}',
    REGION: '${self:provider.region}'
  }
}
