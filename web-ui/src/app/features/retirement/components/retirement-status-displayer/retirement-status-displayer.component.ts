import { Component, OnInit } from '@angular/core';
import { ERetirementPlannerPlanStatus } from 'src/app/core/models/retirement-planner';
import { RetirementPlannerService } from '../../../../core/services/retirement-planner/retirement-planner.service';

@Component({
  selector: 'app-retirement-status-displayer',
  templateUrl: './retirement-status-displayer.component.html',
  styleUrls: ['./retirement-status-displayer.component.scss']
})
export class RetirementStatusDisplayerComponent implements OnInit {

  constructor(public RPS: RetirementPlannerService) { }

  ngOnInit(): void {
  }

  get retirementAge(): number | string {
    if (this.RPS.plan)
      return this.RPS.plan.goal.retirementAge;
    return 'XX';
  }

  get planStatus(): ERetirementPlannerPlanStatus | string {
    if (this.RPS.plan)
      return this.RPS.planStatus;
    return "Loading";
  }
  get classForStatus(): string {
    switch (this.RPS.planStatus) {
      case ERetirementPlannerPlanStatus.ON_TRACK:
        return 'text-success';
      case ERetirementPlannerPlanStatus.MANAGEABLE:
        return 'text-info';
      case ERetirementPlannerPlanStatus.STRETCH:
        return 'text-warning';
      case ERetirementPlannerPlanStatus.NOT_AFFORDABLE:
        return 'text-danger';
      default:
        return ''
    }
  }
}
