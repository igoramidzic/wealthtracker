import { Component, OnInit } from '@angular/core';
import { RetirementPlannerService } from '../../../../core/services/retirement-planner/retirement-planner.service';

@Component({
  selector: 'app-retirement-stats-displayer',
  templateUrl: './retirement-stats-displayer.component.html',
  styleUrls: ['./retirement-stats-displayer.component.scss']
})
export class RetirementStatsDisplayerComponent implements OnInit {

  constructor(public RPS: RetirementPlannerService) { }

  ngOnInit(): void {
  }

  get balanceGoal(): number {
    if (this.RPS.balanceGoal)
      return this.RPS.balanceGoal;

    return 0;
  }

  get currentInvestmentsBalance(): number {
    if (this.RPS.plan)
      return this.RPS.plan.currentInvestmentsBalance;

    return 0;
  }

  get progressToGoal(): number {
    if (this.RPS.plan)
      return this.RPS.progressToGoal;

    return 0;
  }
}
