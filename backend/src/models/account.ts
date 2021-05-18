export interface IAccount {
    accountId: string;
    balances: {
        available: number;
        current: number;
        isoCurrencyCode: string;
    },
    mask: string;
    name: string;
    officialName: string;
    subtype: string;
    type: string;
}