import { Component, OnInit } from '@angular/core';
import { InvestmentPerformanceService } from '../../../../core/services/investment-performance/investment-performance.service';

@Component({
  selector: 'app-investment-performance-displayer',
  templateUrl: './investment-performance-displayer.component.html',
  styleUrls: ['./investment-performance-displayer.component.scss']
})
export class InvestmentPerformanceDisplayerComponent implements OnInit {

  constructor(public IPService: InvestmentPerformanceService) { }

  ngOnInit(): void {
  }

}
