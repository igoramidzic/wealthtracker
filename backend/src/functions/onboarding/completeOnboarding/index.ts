// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';
// import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'onboarding/complete',
        // request: { // This doesn't work for some reason. Causes deployment failure
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
    REGION: '${self:provider.region}'
  }
}
