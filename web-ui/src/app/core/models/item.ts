import { IAccount } from "./account";
import { IInstitution } from "./institution";

export interface IItem {
  itemId: string;
  userId: string;
  accessToken: string;
  accounts: IAccount[];
  institution: IInstitution;
  createdAt: string;
}
