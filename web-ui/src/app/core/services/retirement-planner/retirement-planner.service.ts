import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { Subject } from 'rxjs/internal/Subject';
import { EInvestmentCompoundFrequency, ERetirementPlannerPlanStatus, IRetirementPlannerPlan, IRetirementContribution, IRetirementPlanAssumptions, IRetirementGoal } from '../../models/retirement-planner';
import { AccountsService } from '../accounts/accounts.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RetirementPlannerService {

  plan: IRetirementPlannerPlan;
  plan$: Subject<IRetirementPlannerPlan>;
  balanceGoal: number;
  progressToGoal: number;
  balanceAtRetirement: number;
  planStatus: ERetirementPlannerPlanStatus;
  contributions: IRetirementContribution[];

  constructor(private accountsService: AccountsService) {
    this.plan$ = new Subject();

    this.plan$.subscribe(plan => {
      this.plan = plan;
      this.balanceAtRetirement = this.calculateInvestmentAmountAtRetirement(plan);
      this.balanceGoal = this.calculateBalanceGoal(plan);
      this.progressToGoal = this.calculateProgressToGoal(plan, this.balanceGoal);
      this.planStatus = this.calculatePlanStatus(this.balanceAtRetirement, this.balanceGoal);
      this.contributions = this.calculateContributionsOverTime(plan)
    })

    this.fetchRetirementPlan();
  }

  private fetchRetirementPlan(): void {
    setTimeout(() => {
      // let plan = {
      //   goal: {
      //     retirementAge: faker.datatype.number({ min: 51, max: 85 }),
      //     desiredMonthlySpending: faker.datatype.number({ min: 20, max: 100 }) * 1000 / 12,
      //   },
      //   assumptions: {
      //     inflation: 0.02,
      //     lifeExpectancy: faker.datatype.number({ min: 80, max: 110 }),
      //   },
      //   currentAge: faker.datatype.number({ min: 18, max: 50 }),
      //   currentInvestmentsBalance: faker.datatype.number({ min: 1000, max: 200000 }),
      //   currentPersonalAnnualContributions: faker.datatype.number({ min: 2000, max: 20000 }),
      //   currentEmployerAnnualContributions: faker.datatype.number({ min: 100, max: 5000 }),
      //   currentAnnualIncome: faker.datatype.number({ min: 20000, max: 200000 }),
      //   compoundFrequency: EInvestmentCompoundFrequency.MONTHLY,
      //   annualReturns: faker.datatype.float({ min: 2, max: 10 }) / 100,
      // }
      let plan = {
        goal: {
          retirementAge: 65,
          desiredMonthlySpending: 50000 / 12,
        },
        assumptions: {
          inflation: 0.02,
          lifeExpectancy: 90,
        },
        currentAge: 23,
        currentInvestmentsBalance: 50000,
        currentPersonalAnnualContributions: 11250,
        currentEmployerAnnualContributions: 4000,
        currentAnnualIncome: 100000,
        compoundFrequency: EInvestmentCompoundFrequency.ANNUALLY,
        annualReturns: 0.08,
      }

      this.plan$.next(plan);
    }, 2000);
  }

  editAssumptions(assumptions: IRetirementPlanAssumptions): void {
    this.plan.assumptions = assumptions;
    this.plan$.next(this.plan);
  }

  editGoal(goal: IRetirementGoal): void {
    this.plan.goal = goal;
    this.plan$.next(this.plan);
  }

  private calculateInvestmentAmountAtRetirement(plan: IRetirementPlannerPlan): number {
    let totalAnnualContribution = plan.currentPersonalAnnualContributions + plan.currentEmployerAnnualContributions;
    let P = plan.currentInvestmentsBalance;
    let t = plan.goal.retirementAge - plan.currentAge;
    let r = (plan.annualReturns - plan.assumptions.inflation);
    let n = plan.compoundFrequency == EInvestmentCompoundFrequency.MONTHLY ? 12 : 1;
    let PMT = totalAnnualContribution / n;

    let total = 0;
    for (let i = 0; i < t; i++) {
      total += totalAnnualContribution;
      total *= (1 + r);
    }

    return total;
  }

  private calculateBalanceGoal(plan: IRetirementPlannerPlan): number {
    return plan.goal.desiredMonthlySpending * 12 / 0.04;
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

  private calculateContributionsOverTime(plan: IRetirementPlannerPlan): IRetirementContribution[] {
    let contributions: IRetirementContribution[] = [];

    contributions.push({
      age: plan.currentAge,
      employer: 0,
      personal: plan.currentInvestmentsBalance,
      interest: 0,
      total: plan.currentInvestmentsBalance
    })

    let yearsLeftBeforeRetirement = plan.goal.retirementAge - plan.currentAge;

    for (let i = 1; i <= yearsLeftBeforeRetirement; i++) {
      let age = plan.currentAge + i;

      let previousAccumulatedEmployerContribution = contributions[i - 1].employer;
      let previousAccumulatedPersonalContribution = contributions[i - 1].personal;
      let previousAccumulatedInterest = contributions[i - 1].interest;
      let previousAccumulatedTotal = contributions[i - 1].total;


      let accumulatedEmployerContribution = previousAccumulatedEmployerContribution + plan.currentEmployerAnnualContributions;
      let accumulatedPersonalContribution = previousAccumulatedPersonalContribution + plan.currentPersonalAnnualContributions;

      let currentInterest = (previousAccumulatedTotal + plan.currentEmployerAnnualContributions + plan.currentPersonalAnnualContributions) * (plan.annualReturns - plan.assumptions.inflation);
      let accumulatedInterest = previousAccumulatedInterest + currentInterest;

      let accumulatedTotal = accumulatedEmployerContribution + accumulatedPersonalContribution + accumulatedInterest;

      contributions.push({
        age: age,
        employer: Math.round(accumulatedEmployerContribution * 100) / 100,
        personal: Math.round(accumulatedPersonalContribution * 100) / 100,
        interest: Math.round(accumulatedInterest * 100) / 100,
        total: Math.round(accumulatedTotal * 100) / 100
      })
    }

    for (let i = plan.goal.retirementAge - plan.currentAge + 1; i <= yearsLeftBeforeRetirement + (plan.assumptions.lifeExpectancy - plan.goal.retirementAge); i++) {
      let age = plan.currentAge + i;

      let previousAccumulatedEmployerContribution = contributions[i - 1].employer;
      let previousAccumulatedPersonalContribution = contributions[i - 1].personal;
      let previousAccumulatedInterest = contributions[i - 1].interest;
      let previousAccumulatedTotal = contributions[i - 1].total - (plan.goal.desiredMonthlySpending * 12 * 1.20);

      let currentInterest = (previousAccumulatedTotal) * (0.02 - plan.assumptions.inflation);
      let accumulatedInterest = previousAccumulatedInterest + currentInterest;

      let accumulatedTotal = previousAccumulatedTotal + currentInterest;


      contributions.push({
        age: age,
        employer: Math.round(previousAccumulatedEmployerContribution * 100) / 100,
        personal: Math.round(previousAccumulatedPersonalContribution * 100) / 100,
        interest: Math.round(accumulatedInterest * 100) / 100,
        total: Math.round(accumulatedTotal * 100) / 100
      })
    }

    return contributions;
  }
}


