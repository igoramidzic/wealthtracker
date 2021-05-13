export interface IUser {
    id: string;
    name: string;
    email: string;
    onboarding: IOnboarding;
    createdAt: Date;
}

export interface IOnboarding {
    completed: boolean;
}