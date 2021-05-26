import type { AWS } from '@serverless/typescript';

import getUser from '@functions/user/getUser';
import createUserOnSignUp from '@functions/user/createUserOnSignUp';
import completeOnboarding from '@functions/onboarding/completeOnboarding';
import createLinkToken from '@functions/plaid/createLinkToken';
import exchangePublicToken from '@functions/plaid/exchangePublicToken';
import addItem from '@functions/items/addItem';
import deleteItem from '@functions/items/deleteItem';
import getItems from '@functions/items/getItems';
import getBalances from '@functions/items/getBalances';

const serverlessConfiguration: AWS = {
  service: 'wealthtracker',
  frameworkVersion: '2',
  plugins: ['serverless-webpack', 'serverless-offline'],
  variablesResolutionMode: "20210326",
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
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
      USER_TABLE: '${self:service}-user-${sls:stage}',
      ITEMS_TABLE_PLAID_SANDBOX: '${self:service}-items-plaid_sandbox-${sls:stage}',
      ITEMS_TABLE_PLAID_DEVELOPMENT: '${self:service}-items-plaid_development-${sls:stage}',
      ITEMS_TABLE_PLAID_PRODUCTION: '${self:service}-items-plaid_production-${sls:stage}',
      REGION: '${self:provider.region}',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PARAMETERS_PATH: '/${self:service}/${sls:stage}',
      PLAID_CLIENT_ID_PATH: '/${self:service}/${sls:stage}/plaid_client_id',
      PLAID_SECRET_PATH: '/${self:service}/${sls:stage}/plaid_secret',
      PLAID_ENV_PATH: '/${self:service}/${sls:stage}/plaid_env',
      PLAID_PRODUCTS_PATH: '/${self:service}/${sls:stage}/plaid_products',
      PLAID_COUNTRY_CODES_PATH: '/${self:service}/${sls:stage}/plaid_country_codes',
    },
    lambdaHashingVersion: '20201221',
    iamManagedPolicies: [
      "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess",
      "arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess"
    ]
  },
  // import the function via paths
  functions: {
    getUser, createUserOnSignUp, completeOnboarding, createLinkToken, exchangePublicToken,
    addItem, deleteItem, getItems, getBalances
  },
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
      itemsTableSandbox: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: '${self:service}-items-plaid_sandbox-${sls:stage}',
          AttributeDefinitions: [{
            AttributeName: 'itemId',
            AttributeType: 'S'
          }, {
            AttributeName: 'userId',
            AttributeType: 'S'
          }],
          KeySchema: [{
            AttributeName: 'userId',
            KeyType: 'HASH'
          }, {
            AttributeName: 'itemId',
            KeyType: 'RANGE'
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        },
        DeletionPolicy: "Delete"
      },
      itemsTableDevelopment: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: '${self:service}-items-plaid_development-${sls:stage}',
          AttributeDefinitions: [{
            AttributeName: 'itemId',
            AttributeType: 'S'
          }, {
            AttributeName: 'userId',
            AttributeType: 'S'
          }],
          KeySchema: [{
            AttributeName: 'userId',
            KeyType: 'HASH'
          }, {
            AttributeName: 'itemId',
            KeyType: 'RANGE'
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        },
        DeletionPolicy: "Delete"
      },
      itemsTableProduction: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: '${self:service}-items-plaid_production-${sls:stage}',
          AttributeDefinitions: [{
            AttributeName: 'itemId',
            AttributeType: 'S'
          }, {
            AttributeName: 'userId',
            AttributeType: 'S'
          }],
          KeySchema: [{
            AttributeName: 'userId',
            KeyType: 'HASH'
          }, {
            AttributeName: 'itemId',
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
