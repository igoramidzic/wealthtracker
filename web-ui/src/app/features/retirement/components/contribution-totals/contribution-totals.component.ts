import { Component, OnInit, OnDestroy } from '@angular/core';
import { RetirementPlannerService } from '../../../../core/services/retirement-planner/retirement-planner.service';
import { ThousandSuffixesPipe } from '../../../../core/pipes/currencySuffix.pipe';
import { IRetirementContribution } from '../../../../core/models/retirement-planner';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-contribution-totals',
  templateUrl: './contribution-totals.component.html',
  styleUrls: ['./contribution-totals.component.scss'],
  providers: [ThousandSuffixesPipe]
})
export class ContributionTotalsComponent implements OnInit, OnDestroy {

  private contributions: IRetirementContribution[];
  private contributions$: Subscription;

  constructor(private RPS: RetirementPlannerService,
    private thousandSuff: ThousandSuffixesPipe) { }

  ngOnInit(): void {
    this.contributions$ = this.RPS.plan$.subscribe(plan => {
      this.contributions = this.RPS.contributions;
    })
  }

  ngOnDestroy(): void {
    this.contributions$.unsubscribe();
  }

  get personalContributionTotal(): number {
    if (!this.contributions) return 0;
    return this.thousandSuff.transform(this.contributions[this.contributions.length - 1].personal);
  }

  get employerContributionTotal(): number {
    if (!this.contributions) return 0;
    return this.thousandSuff.transform(this.contributions[this.contributions.length - 1].employer);
  }

  get interestContributionTotal(): number {
    if (!this.contributions) return 0;
    return this.thousandSuff.transform(this.contributions[this.contributions.length - 1].interest);
  }
}
