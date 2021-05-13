export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  onboarding: IOnboarding;
  created: Date;
  updated: Date;
}

export interface IOnboarding {
  completed: boolean;
}
