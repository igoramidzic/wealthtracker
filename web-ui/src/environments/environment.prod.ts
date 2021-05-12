import { IEnvironment, EEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  environment: EEnvironment.Production,
  wealthtracker_api_url: '',
  plaid: {
    client_id: "5e24db63dad2b80015cc8eec",
    environment: "sandbox", // Change to "production" once we get production keys 02/26/2021
    apiVersion: "v2",
    clientName: "",
    countryCodes: ["US"],
    products: ['auth', 'transactions']
  }
};
