import { Component, OnInit } from '@angular/core';
import { ERetirementPlannerPlanStatus } from 'src/app/core/models/retirement-planner';
import { RetirementPlannerService } from '../../../../core/services/retirement-planner/retirement-planner.service';

@Component({
  selector: 'app-retirement-planner-page',
  templateUrl: './retirement-planner-page.component.html',
  styleUrls: ['./retirement-planner-page.component.scss']
})
export class RetirementPlannerPageComponent implements OnInit {

  constructor(public RPS: RetirementPlannerService) { }

  ngOnInit(): void {
  }

}
