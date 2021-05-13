import { Client, environments } from "plaid";

export const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
export const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || 'transactions').split(
  ',',
);

// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
export const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
  ',',
);

export const plaidClient = new Client({
  clientID: process.env.PLAID_CLIENT_ID || '',
  secret: process.env.PLAID_SECRET || '',
  env: environments[PLAID_ENV],
  options: {
    version: '2019-05-29',
  },
});

