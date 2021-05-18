// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';
// import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'item',
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
  }
}
