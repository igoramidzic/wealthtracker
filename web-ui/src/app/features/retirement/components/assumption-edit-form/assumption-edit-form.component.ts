import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IRetirementPlannerPlan, IRetirementPlanAssumptions } from '../../../../core/models/retirement-planner';
import { RetirementPlannerService } from '../../../../core/services/retirement-planner/retirement-planner.service';

@Component({
  selector: 'app-assumption-edit-form',
  templateUrl: './assumption-edit-form.component.html',
  styleUrls: ['./assumption-edit-form.component.scss']
})
export class AssumptionEditFormComponent implements OnInit {

  @Output() updated: EventEmitter<void>;
  @Output() canceled: EventEmitter<void>;
  assumptions: IRetirementPlanAssumptions;

  constructor(private RPS: RetirementPlannerService) {
    this.updated = new EventEmitter();
    this.canceled = new EventEmitter();
    this.assumptions = this.getCopyOfAssumptions(RPS.plan.assumptions);
    this.assumptions.inflation *= 100;
  }

  ngOnInit(): void {
  }

  getCopyOfAssumptions(assumptions: IRetirementPlanAssumptions): IRetirementPlanAssumptions {
    return JSON.parse(JSON.stringify(assumptions));
  }

  onSave(): void {
    this.assumptions.inflation /= 100;
    this.RPS.editAssumptions(this.assumptions)
    this.updated.emit();
  }

  onCancel(): void {
    this.canceled.emit();
  }
}
