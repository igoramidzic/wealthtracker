import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RetirementComponent } from './retirement.component';
import { RETIREMENT_ROUTES } from './retirement.routes';
import { RetirementPlannerPageComponent } from './pages/retirement-planner-page/retirement-planner-page.component';

@NgModule({
  declarations: [
    RetirementComponent,
    RetirementPlannerPageComponent
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
