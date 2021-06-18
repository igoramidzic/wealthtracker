import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RetirementComponent } from './retirement.component';
import { RETIREMENT_ROUTES } from './retirement.routes';
import { RetirementPlannerPageComponent } from './pages/retirement-planner-page/retirement-planner-page.component';
import { ContributionsChartComponent } from './components/contributions-chart/contributions-chart.component';
import { ContributionTotalsComponent } from './components/contribution-totals/contribution-totals.component';
import { RetirementStatusDisplayerComponent } from './components/retirement-status-displayer/retirement-status-displayer.component';
import { RetirementStatsDisplayerComponent } from './components/retirement-stats-displayer/retirement-stats-displayer.component';
import { AssumptionDisplayerComponent } from './components/assumption-displayer/assumption-displayer.component';
import { AssumptionEditFormComponent } from './components/assumption-edit-form/assumption-edit-form.component';
import { AssumptionsSectionComponent } from './components/assumptions-section/assumptions-section.component';
import { GoalSectionComponent } from './components/goal-section/goal-section.component';
import { GoalEditFormComponent } from './components/goal-edit-form/goal-edit-form.component';
import { GoalDisplayerComponent } from './components/goal-displayer/goal-displayer.component';
import { ReturnsDisclaimerComponent } from './components/returns-disclaimer/returns-disclaimer.component';
import { InvestmentPerformanceDisplayerComponent } from './components/investment-performance-displayer/investment-performance-displayer.component';

@NgModule({
  declarations: [
    RetirementComponent,
    RetirementPlannerPageComponent,
    ContributionsChartComponent,
    ContributionTotalsComponent,
    RetirementStatusDisplayerComponent,
    RetirementStatsDisplayerComponent,
    AssumptionDisplayerComponent,
    AssumptionEditFormComponent,
    AssumptionsSectionComponent,
    GoalSectionComponent,
    GoalEditFormComponent,
    GoalDisplayerComponent,
    ReturnsDisclaimerComponent,
    InvestmentPerformanceDisplayerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(RETIREMENT_ROUTES),
  ],
  exports: [
  ],
  providers: [],
})
export class RetirementModule { }
