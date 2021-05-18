import { IAccount } from "./account";

export interface IItem {
    itemId: string;
    userId: string;
    accessToken: string;
    accounts: IAccount[];
    institution: {
        name: string;
        id: string;
        logo?: string;
        url?: string;
    };
    createdAt: string;
}