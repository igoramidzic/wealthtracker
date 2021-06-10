import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RetirementPlannerService } from 'src/app/core/services/retirement-planner/retirement-planner.service';

@Component({
  selector: 'app-goal-displayer',
  templateUrl: './goal-displayer.component.html',
  styleUrls: ['./goal-displayer.component.scss']
})
export class GoalDisplayerComponent implements OnInit {

  @Output() edit: EventEmitter<void>;

  constructor(public RPS: RetirementPlannerService) {
    this.edit = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onEdit(): void {
    this.edit.emit();
  }

}
