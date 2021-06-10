import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assumptions-section',
  templateUrl: './assumptions-section.component.html',
  styleUrls: ['./assumptions-section.component.scss']
})
export class AssumptionsSectionComponent implements OnInit {

  showEditAssumptionsForm: boolean;

  constructor() {
    this.showEditAssumptionsForm = false;
  }

  ngOnInit(): void {
  }

  onEdit(): void {
    this.showEditAssumptionsForm = true;
  }

  onUpdated(): void {
    this.showEditAssumptionsForm = false;
  }

  onCanceled(): void {
    this.showEditAssumptionsForm = false;
  }
}
