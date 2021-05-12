import { CognitoUser } from "@aws-amplify/auth";

export interface ISignUpResult {
  user: CognitoUser;
  userConfirmed: boolean;
  userSub: string;
}
