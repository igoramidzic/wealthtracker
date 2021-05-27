import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { EInvestmentCompoundFrequency, IRetirementPlannerPlan } from '../../models/retirement-planner';

@Injectable({
  providedIn: 'root'
})
export class RetirementPlannerService {

  plan: IRetirementPlannerPlan;
  balanceGoal: number;
  progressToGoal: number;
  balanceAtRetirement: number;
  planStatus: ERetirementPlannerPlanStatus;

  constructor() {
    this.plan = {
      inflation: 0.02,
      currentAge: faker.datatype.number({ min: 18, max: 50 }),
      retirementAge: faker.datatype.number({ min: 51, max: 85 }),
      desiredRetirementAnnualIncome: faker.datatype.number({ min: 20, max: 100 }) * 100,
      currentInvestmentsBalance: faker.datatype.number({ min: 1000, max: 200000 }),
      currentPersonalAnnualContributions: faker.datatype.number({ min: 2000, max: 20000 }),
      currentEmployerAnnualContributions: faker.datatype.number({ min: 100, max: 5000 }),
      expectedReturns: faker.datatype.float({ min: 2, max: 10 }),
      currentAnnualIncome: faker.datatype.number({ min: 20000, max: 200000 }),
      compoundFrequency: EInvestmentCompoundFrequency.MONTHLY
    }

    this.balanceAtRetirement = this.calculateInvestmentAmountAtRetirement(this.plan);
    this.balanceGoal = this.calculateBalanceGoal(this.plan);
    this.progressToGoal = this.calculateProgressToGoal(this.plan, this.balanceGoal);
    this.planStatus = this.calculatePlanStatus(this.balanceAtRetirement, this.balanceGoal);
  }

  private calculateInvestmentAmountAtRetirement(plan: IRetirementPlannerPlan): number {
    let totalAnnualContribution = plan.currentPersonalAnnualContributions + plan.currentEmployerAnnualContributions;
    let P = plan.currentInvestmentsBalance;
    let t = plan.retirementAge - plan.currentAge;
    let r = (plan.expectedReturns - plan.inflation) / 100;
    let n = plan.compoundFrequency == EInvestmentCompoundFrequency.MONTHLY ? 12 : 1;
    let PMT = totalAnnualContribution / n;

    let compoundInterestForPrincipal = P * ((1 + (r / n)) ** (n * t));
    let futureValueOfAssets = (PMT * (((1 + r / n) ** (n * t) - 1) / (r / n)))

    return compoundInterestForPrincipal + futureValueOfAssets;
  }

  private calculateBalanceGoal(plan: IRetirementPlannerPlan): number {
    return plan.desiredRetirementAnnualIncome / 0.04;
  }

  private calculateProgressToGoal(plan: IRetirementPlannerPlan, balanceGoal: number): number {
    return Math.round(plan.currentInvestmentsBalance / balanceGoal * 100);
  }

  private calculatePlanStatus(investmentBalanceAtRetirement: number, investmentBalanceGoal: number): ERetirementPlannerPlanStatus {
    let percetageOfBalanceAtRetirementOverBalanceGoal = Math.round(investmentBalanceAtRetirement / investmentBalanceGoal * 100);
    if (percetageOfBalanceAtRetirementOverBalanceGoal >= 90)
      return ERetirementPlannerPlanStatus.ON_TRACK;
    else if (percetageOfBalanceAtRetirementOverBalanceGoal >= 70)
      return ERetirementPlannerPlanStatus.MANAGEABLE;
    else if (percetageOfBalanceAtRetirementOverBalanceGoal >= 30)
      return ERetirementPlannerPlanStatus.STRETCH;
    else
      return ERetirementPlannerPlanStatus.NOT_AFFORDABLE;
  }
}

export enum ERetirementPlannerPlanStatus {
  ON_TRACK = 'On Track',
  MANAGEABLE = 'Manageable',
  STRETCH = 'It\'s a Stretch',
  NOT_AFFORDABLE = 'Not Affordable'
}
