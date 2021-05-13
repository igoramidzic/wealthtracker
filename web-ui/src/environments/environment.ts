// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EEnvironment, IEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  environment: EEnvironment.Development,
  wealthtracker_api_url: 'https://tw71jcqt3g.execute-api.us-east-2.amazonaws.com/dev',
  plaid: {
    client_id: "5e24db63dad2b80015cc8eec",
    environment: "sandbox",
    apiVersion: "v2",
    clientName: "",
    countryCodes: ["US"],
    products: ['auth', 'transactions', 'investments']
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.

