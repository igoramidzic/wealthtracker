import { Component, OnInit } from '@angular/core';
import { RetirementPlannerService } from '../../../../core/services/retirement-planner/retirement-planner.service';
import { ThousandSuffixesPipe } from '../../../../core/pipes/currencySuffix.pipe';

@Component({
  selector: 'app-contribution-totals',
  templateUrl: './contribution-totals.component.html',
  styleUrls: ['./contribution-totals.component.scss'],
  providers: [ThousandSuffixesPipe]
})
export class ContributionTotalsComponent implements OnInit {

  constructor(private RPS: RetirementPlannerService,
    private thousandSuff: ThousandSuffixesPipe) { }

  ngOnInit(): void {
  }

  get personalContributionTotal(): number {
    return this.thousandSuff.transform(this.RPS.contributions[this.RPS.contributions.length - 1].personal);
  }

  get employerContributionTotal(): number {
    return this.thousandSuff.transform(this.RPS.contributions[this.RPS.contributions.length - 1].employer);
  }

  get interestContributionTotal(): number {
    return this.thousandSuff.transform(this.RPS.contributions[this.RPS.contributions.length - 1].interest);
  }
}
