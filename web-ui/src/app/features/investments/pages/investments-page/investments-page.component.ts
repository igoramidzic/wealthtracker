import { Component, OnInit } from '@angular/core';
import { InvestmentPerformanceService } from '../../../../core/services/investment-performance/investment-performance.service';

@Component({
  selector: 'app-investments-page',
  templateUrl: './investments-page.component.html',
  styleUrls: ['./investments-page.component.scss']
})
export class InvestmentsPageComponent implements OnInit {

  constructor(public IPService: InvestmentPerformanceService) { }

  ngOnInit(): void {
  }

}
