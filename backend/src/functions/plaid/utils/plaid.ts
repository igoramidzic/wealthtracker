import { Client, environments } from "plaid";
import { EPlaidEnvironment } from "src/models/plaid";

export const createPlaidClient = (config: { client_id: string, secret: string, env: EPlaidEnvironment }) => {
  return new Client({
    clientID: config.client_id,
    secret: config.secret,
    env: environments[config.env],
    options: {
      version: '2019-05-29',
    },
  });
}