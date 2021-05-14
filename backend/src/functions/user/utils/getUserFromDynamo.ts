import { IUser } from "src/models/user";
import * as aws from 'aws-sdk';

export const getUserFromDynamo = async (userId: string): Promise<IUser> => {
    aws.config.update({ region: process.env.REGION });

    var ddb = new aws.DynamoDB.DocumentClient();

    let params = {
        Key: {
            id: userId
        },
        TableName: process.env.USER_TABLE
    };

    let userDoc = await ddb.get(params).promise();

    let user = userDoc.Item;

    if (user)
        return <IUser>(user);

    throw new Error("User not found.");
}