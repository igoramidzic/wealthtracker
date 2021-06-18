import { Component, OnInit } from '@angular/core';
import { curveBasis } from 'd3-shape';
import { RetirementPlannerService } from '../../../../core/services/retirement-planner/retirement-planner.service';
import { IRetirementContribution, IRetirementPlannerPlan } from '../../../../core/models/retirement-planner';
import { ThousandSuffixesPipe } from 'src/app/core/pipes/currencySuffix.pipe';

@Component({
  selector: 'app-contributions-chart',
  templateUrl: './contributions-chart.component.html',
  styleUrls: ['./contributions-chart.component.scss'],
  providers: [ThousandSuffixesPipe]
})
export class ContributionsChartComponent implements OnInit {

  plan: IRetirementPlannerPlan;

  // options
  multi: any[];
  autoScale: boolean = true;
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  showGridLines: boolean = false;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Contributions';
  timeline: boolean = false;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  xAxisTicks: number[] = [];
  yAxisTickFormatting = (tick) => {
    return this.thousandSuff.transform(tick, 1);
  }
  curve = curveBasis

  colorScheme = {
    domain: ['#4f78f4', '#5A9DF3', '#3AB1E0']
  };

  constructor(private RPS: RetirementPlannerService,
    private thousandSuff: ThousandSuffixesPipe) {
    this.RPS.plan$.subscribe(plan => {
      this.plan = plan;
      this.performSetupOnNewPlan(plan);
    });

    this.plan = this.RPS.plan;
    this.performSetupOnNewPlan(this.RPS.plan);
  }

  ngOnInit(): void {
  }

  performSetupOnNewPlan(plan: IRetirementPlannerPlan): void {
    this.massageContributionsIntoChartInput(this.RPS.contributions);
    this.generateXAxisTicks(plan);
  }

  onSelect(event) {
    console.log(event);
  }

  onActivate(event): void {
    console.log(event)
  }

  massageContributionsIntoChartInput(contributions: IRetirementContribution[]): void {
    this.multi = [
      {
        name: "Balance",
        series: []
      },
      // {
      //   name: "Employer",
      //   series: []
      // },
      // {
      //   name: "My Contribution",
      //   series: []
      // },
    ];

    for (let i = 0; i < contributions.length; i++) {
      this.multi[0].series.push({
        name: contributions[i].age,
        value: contributions[i].total
      });

      // this.multi[1].series.push({
      //   name: contributions[i].age,
      //   value: contributions[i].employer
      // });

      // this.multi[2].series.push({
      //   name: contributions[i].age,
      //   value: contributions[i].interest
      // });
    }

    // let currentBalance = contributions[contributions.length - 1].total;
    // let age = contributions[contributions.length - 1].age + 1;

    // while (age <= this.plan.assumptions.lifeExpectancy) {
    //   let newBalance = currentBalance - this.plan.goal.desiredRetirementAnnualIncome
    //   this.multi[0].series.push({
    //     name: age,
    //     value: newBalance < 0 ? 0 : newBalance
    //   });

    //   age++;
    //   currentBalance -= this.plan.goal.desiredRetirementAnnualIncome;
    // }
  }

  generateXAxisTicks(plan: IRetirementPlannerPlan): void {
    this.xAxisTicks = [];
    this.xAxisTicks.push(plan.currentAge);
    this.xAxisTicks.push(plan.goal.retirementAge);
    this.xAxisTicks.push(plan.assumptions.lifeExpectancy);
  }
}
