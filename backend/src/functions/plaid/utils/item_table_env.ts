import { EPlaidEnvironment } from "src/models/plaid"

export const getItemsTableName = (plaidEnv: EPlaidEnvironment): string => {
    switch (plaidEnv) {
        case EPlaidEnvironment.SANDBOX:
            return process.env.ITEMS_TABLE_PLAID_SANDBOX;
        case EPlaidEnvironment.DEVELOPMENT:
            return process.env.ITEMS_TABLE_PLAID_DEVELOPMENT;
        case EPlaidEnvironment.PRODUCTION:
            return process.env.ITEMS_TABLE_PLAID_PRODUCTION;
        default:
            return process.env.ITEMS_TABLE_PLAID_SANDBOX;
    }
}