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

}
