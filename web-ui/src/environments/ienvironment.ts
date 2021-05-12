export interface IEnvironment {
  environment: EEnvironment;
  wealthtracker_api_url: string;
  plaid: {
    client_id: string;
    environment: string;
    apiVersion: string;
    clientName: string;
    countryCodes: string[];
    products: string[];
  }
}

export enum EEnvironment {
  Development,
  Stage,
  Production
}
