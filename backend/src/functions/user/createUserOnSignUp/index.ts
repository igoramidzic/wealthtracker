// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

const postConfirmationEvent: {
  cognitoUserPool: {
    pool: string;
    trigger:
    | "PreSignUp"
    | "PostConfirmation"
    | "PreAuthentication"
    | "PostAuthentication"
    | "PreTokenGeneration"
    | "CustomMessage"
    | "DefineAuthChallenge"
    | "CreateAuthChallenge"
    | "VerifyAuthChallengeResponse"
    | "UserMigration";
    existing?: boolean;
  };
} = {
  cognitoUserPool: {
    pool: "MyUserPool",
    trigger: "PostConfirmation"
  }
}

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    postConfirmationEvent
  ],
  environment: {
  }
}
