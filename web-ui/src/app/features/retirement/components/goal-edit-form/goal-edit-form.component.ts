import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IRetirementGoal } from 'src/app/core/models/retirement-planner';
import { RetirementPlannerService } from 'src/app/core/services/retirement-planner/retirement-planner.service';

@Component({
  selector: 'app-goal-edit-form',
  templateUrl: './goal-edit-form.component.html',
  styleUrls: ['./goal-edit-form.component.scss']
})
export class GoalEditFormComponent implements OnInit {

  @Output() updated: EventEmitter<void>;
  @Output() canceled: EventEmitter<void>;
  goal: IRetirementGoal;

  constructor(private RPS: RetirementPlannerService) {
    this.updated = new EventEmitter();
    this.canceled = new EventEmitter();
    this.goal = this.getCopyOfObject<IRetirementGoal>(RPS.plan.goal);
  }

  ngOnInit(): void {
  }

  getCopyOfObject<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  onSave(): void {
    this.RPS.editGoal(this.goal)
    this.updated.emit();
  }

  onCancel(): void {
    this.canceled.emit();
  }

}
