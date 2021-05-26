import { IAccount } from "./account";
import { IInstitution } from "./institution";

export interface IItem {
  itemId: string;
  userId: string;
  accessToken: string;
  accounts: IAccount[];
  institution: IInstitution;
  createdAt: string;
  status?: EItemStatus;
}

export enum EItemStatus {
  IDLE = 'Idle',
  REFRESHING = 'Refreshing',
  FAILED_REFRESHING = 'Failed Refreshing'
}
