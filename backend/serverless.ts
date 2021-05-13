import type { AWS } from '@serverless/typescript';

import getUser from '@functions/user/getUser';
import createUserOnSignUp from '@functions/user/createUserOnSignUp';
import completeOnboarding from '@functions/onboarding/completeOnboarding';
import getPlaidLinkToken from '@functions/plaid/getPlaidLinkToken';
import exchangePublicToken from '@functions/plaid/exchangePublicToken';

const serverlessConfiguration: AWS = {
  service: 'wealthtracker',
  frameworkVersion: '2',
  plugins: ['serverless-webpack', 'serverless-offline'],
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    }
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-2',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { getUser, createUserOnSignUp, completeOnboarding, getPlaidLinkToken, exchangePublicToken },
  useDotenv: true,
  resources: {
    Resources: {
      userTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: '${self:service}-user-${sls:stage}',
          AttributeDefinitions: [{
            AttributeName: 'id',
            AttributeType: 'S'
          }],
          KeySchema: [{
            AttributeName: 'id',
            KeyType: 'HASH'
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        },
        DeletionPolicy: "Delete"
      },
      accountTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: '${self:service}-account-${sls:stage}',
          AttributeDefinitions: [{
            AttributeName: 'accountId',
            AttributeType: 'S'
          }, {
            AttributeName: 'userId',
            AttributeType: 'S'
          }],
          KeySchema: [{
            AttributeName: 'accountId',
            KeyType: 'HASH'
          }, {
            AttributeName: 'userId',
            KeyType: 'RANGE'
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        },
        DeletionPolicy: "Delete"
      },
      CognitoUserPoolMyUserPool: {
        Type: "AWS::Cognito::UserPool",
        Properties: {
          AccountRecoverySetting: {
            RecoveryMechanisms: [
              {
                Name: "verified_email",
                Priority: 1
              }
            ]
          },
          AdminCreateUserConfig: {},
          AliasAttributes: [],
          AutoVerifiedAttributes: ["email"],
          DeviceConfiguration: {},
          EmailConfiguration: {},
          // EmailVerificationMessage: "",
          // EmailVerificationSubject: "",
          EnabledMfas: [],
          LambdaConfig: {},
          MfaConfiguration: "OFF",
          Policies: {
            PasswordPolicy: {
              MinimumLength: 8,
              RequireLowercase: false,
              RequireNumbers: false,
              RequireSymbols: false,
              RequireUppercase: false,
              TemporaryPasswordValidityDays: 7
            }
          },
          Schema: [
            {
              AttributeDataType: "String",
              DeveloperOnlyAttribute: false,
              Mutable: true,
              Name: "name",
              NumberAttributeConstraints: {},
              Required: true,
              StringAttributeConstraints: {}
            }
          ],
          // SmsAuthenticationMessage: "",
          // SmsConfiguration: {},
          // SmsVerificationMessage: "",
          UsernameAttributes: [
            "email"
          ],
          UsernameConfiguration: {
            CaseSensitive: false
          },
          // UserPoolAddOns: {},
          UserPoolName: "${self:service}-user-pool--${sls:stage}",
          UserPoolTags: {},
          VerificationMessageTemplate: {}
        }
      },
      UserPoolClientWealthTrackerNativeClient: {
        Type: "AWS::Cognito::UserPoolClient",
        Properties: {
          AccessTokenValidity: 60,
          AllowedOAuthFlows: [
            // {

            // }
          ],
          AllowedOAuthFlowsUserPoolClient: false,
          AllowedOAuthScopes: [],
          // AnalyticsConfiguration: {},
          CallbackURLs: [],
          ClientName: "${self:service}-native-app--${sls:stage}",
          // DefaultRedirectURI: "",
          // ExplicitAuthFlows: [""],
          GenerateSecret: true,
          IdTokenValidity: 60,
          // LogoutURLs: [""],
          PreventUserExistenceErrors: "ENABLED",
          ReadAttributes: ["email", "email_verified", "name"],
          RefreshTokenValidity: 30,
          // SupportedIdentityProviders: [""],
          TokenValidityUnits: {
            AccessToken: "minutes",
            IdToken: "minutes",
            RefreshToken: "days"
          },
          UserPoolId: { Ref: "CognitoUserPoolMyUserPool" },
          WriteAttributes: ["name"]
        }
      },
      UserPoolClientWealthTrackerWebClient: {
        Type: "AWS::Cognito::UserPoolClient",
        Properties: {
          AccessTokenValidity: 60,
          AllowedOAuthFlows: [
            // {

            // }
          ],
          AllowedOAuthFlowsUserPoolClient: false,
          AllowedOAuthScopes: [],
          // AnalyticsConfiguration: {},
          CallbackURLs: [],
          ClientName: "${self:service}-web-angular-app--${sls:stage}",
          // DefaultRedirectURI: "",
          // ExplicitAuthFlows: [""],
          GenerateSecret: false,
          IdTokenValidity: 60,
          // LogoutURLs: [""],
          PreventUserExistenceErrors: "ENABLED",
          ReadAttributes: ["email", "email_verified", "name"],
          RefreshTokenValidity: 30,
          // SupportedIdentityProviders: [""],
          TokenValidityUnits: {
            AccessToken: "minutes",
            IdToken: "minutes",
            RefreshToken: "days"
          },
          UserPoolId: { Ref: "CognitoUserPoolMyUserPool" },
          WriteAttributes: ["name"]
        }
      },
      IdentityPoolMyIdentityPool: {
        Type: "AWS::Cognito::IdentityPool",
        Properties: {
          AllowClassicFlow: false,
          AllowUnauthenticatedIdentities: false,
          // CognitoEvents: {},
          CognitoIdentityProviders: [
            {
              ClientId: { Ref: "UserPoolClientWealthTrackerWebClient" },
              ProviderName: { "Fn::GetAtt": ["CognitoUserPoolMyUserPool", "ProviderName"] },
              ServerSideTokenCheck: true
            }
          ],
          // CognitoStreams: {},
          // DeveloperProviderName: String,
          IdentityPoolName: "${self:service}_identity_pool__${sls:stage}",
          // OpenIdConnectProviderARNs: [""],
          // PushSync: {},
          // SamlProviderARNs: [""],
          SupportedLoginProviders: {}
        }
      },
      IdentityPoolAuthenticatedRole: {
        Type: "AWS::IAM::Role",
        Properties: {
          AssumeRolePolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Sid: "",
                Effect: "Allow",
                Principal: {
                  Federated: "cognito-identity.amazonaws.com"
                },
                Action: "sts:AssumeRoleWithWebIdentity"
              }
            ]
          },
          Description: "",
          // ManagedPolicyArns: [""],
          MaxSessionDuration: 3600,
          Path: "/",
          // PermissionsBoundary: "",
          // Policies: [{}],
          RoleName: "${self:service}-identity-pool-authRole-${sls:stage}",
          Tags: []
        }
      },
      IdentityPoolUnAuthenticatedRole: {
        Type: "AWS::IAM::Role",
        Properties: {
          AssumeRolePolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Sid: "",
                Effect: "Allow",
                Principal: {
                  Federated: "cognito-identity.amazonaws.com"
                },
                Action: "sts:AssumeRoleWithWebIdentity"
              }
            ]
          },
          Description: "",
          // ManagedPolicyArns: [""],
          MaxSessionDuration: 3600,
          Path: "/",
          // PermissionsBoundary: "",
          // Policies: [{}],
          RoleName: "${self:service}-identity-pool-unauthRole-${sls:stage}",
          Tags: []
        }
      },
      IdentitypoolRoleAttachmentMap: {
        Type: "AWS::Cognito::IdentityPoolRoleAttachment",
        Properties: {
          IdentityPoolId: { Ref: "IdentityPoolMyIdentityPool" },
          Roles: {
            authenticated: {
              "Fn::GetAtt": [
                "IdentityPoolAuthenticatedRole",
                "Arn"
              ]
            },
            unauthenticated: {
              "Fn::GetAtt": [
                "IdentityPoolUnAuthenticatedRole",
                "Arn"
              ]
            }
          }
        }
      },
      userPoolAuthorizer: {
        Type: "AWS::ApiGateway::Authorizer",
        Properties: {
          IdentitySource: "method.request.header.Authorization",
          Name: "UserPoolAuthorizer",
          ProviderARNs: [{
            "Fn::GetAtt": [
              "CognitoUserPoolMyUserPool",
              "Arn"
            ]
          }],
          RestApiId: {
            Ref: "ApiGatewayRestApi"
          },
          Type: "COGNITO_USER_POOLS"
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
