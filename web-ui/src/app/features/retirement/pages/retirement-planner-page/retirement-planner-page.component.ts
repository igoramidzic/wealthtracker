import { Component, OnInit } from '@angular/core';
import { ERetirementPlannerPlanStatus, RetirementPlannerService } from '../../../../core/services/retirement-planner/retirement-planner.service';

@Component({
  selector: 'app-retirement-planner-page',
  templateUrl: './retirement-planner-page.component.html',
  styleUrls: ['./retirement-planner-page.component.scss']
})
export class RetirementPlannerPageComponent implements OnInit {

  constructor(public RPS: RetirementPlannerService) { }

  ngOnInit(): void {
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
    }
  }
}
