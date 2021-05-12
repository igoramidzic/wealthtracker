export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  onboarding: {
    completed: boolean;
  };
  created: Date;
  updated: Date;
}
