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
  subtype: EAccountSubtype;
  type: EAccountType;
}

export enum EAccountSubtype {
  CHECKING = 'checking'
}

export enum EAccountType {
  DEPOSITORY = 'depository'
}
