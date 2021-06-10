import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal-section',
  templateUrl: './goal-section.component.html',
  styleUrls: ['./goal-section.component.scss']
})
export class GoalSectionComponent implements OnInit {

  showEditForm: boolean;

  constructor() {
    this.showEditForm = false;
  }

  ngOnInit(): void {
  }

  onEdit(): void {
    this.showEditForm = true;
  }

  onUpdated(): void {
    this.showEditForm = false;
  }

  onCanceled(): void {
    this.showEditForm = false;
  }
}
