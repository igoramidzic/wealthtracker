export interface IRetirementPlannerPlan {
  currentAge: number;
  currentInvestmentsBalance: number;
  currentPersonalAnnualContributions: number;
  currentEmployerAnnualContributions: number;
  currentAnnualIncome: number;
  compoundFrequency: EInvestmentCompoundFrequency;
  annualReturns: number;

  goal: IRetirementGoal;
  assumptions: IRetirementPlanAssumptions;
}

export interface IRetirementGoal {
  retirementAge: number;
  desiredRetirementAnnualIncome: number;
}

export interface IRetirementPlanAssumptions {
  effectiveTaxRate: number;
  lifeExpectancy: number;
  inflation: number;
}

export enum EInvestmentCompoundFrequency {
  ANNUALLY = 'annually',
  MONTHLY = 'monthly'
}

export enum ERetirementPlannerPlanStatus {
  ON_TRACK = 'On Track',
  MANAGEABLE = 'Manageable',
  STRETCH = 'It\'s a Stretch',
  NOT_AFFORDABLE = 'Not Affordable'
}

export interface IRetirementContribution {
  age: number;
  personal: number;
  employer: number;
  interest: number;
  total: number;
}
