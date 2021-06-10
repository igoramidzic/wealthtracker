import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RetirementPlannerService } from '../../../../core/services/retirement-planner/retirement-planner.service';
import { IRetirementPlannerPlan } from '../../../../core/models/retirement-planner';

@Component({
  selector: 'app-assumption-displayer',
  templateUrl: './assumption-displayer.component.html',
  styleUrls: ['./assumption-displayer.component.scss']
})
export class AssumptionDisplayerComponent implements OnInit {

  @Output() edit: EventEmitter<void>;

  constructor(public RPS: RetirementPlannerService) {
    this.edit = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onEditAssumptions(): void {
    this.edit.emit();
  }
}
