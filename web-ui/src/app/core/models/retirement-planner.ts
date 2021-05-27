export interface IRetirementPlannerPlan {
  inflation: number;
  currentAge: number;
  retirementAge: number;
  desiredRetirementAnnualIncome: number;
  currentInvestmentsBalance: number;
  currentPersonalAnnualContributions: number;
  currentEmployerAnnualContributions: number;
  expectedReturns: number;
  currentAnnualIncome: number;
  compoundFrequency: EInvestmentCompoundFrequency;
}

export enum EInvestmentCompoundFrequency {
  ANNUALLY = 'annually',
  MONTHLY = 'monthly'
}
