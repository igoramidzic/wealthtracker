import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvestmentsComponent } from './investments.component';
import { INVESTMENTS_ROUTES } from './investments.routes';
import { InvestmentsPageComponent } from './pages/investments-page/investments-page.component';

@NgModule({
  declarations: [
    InvestmentsComponent,
    InvestmentsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(INVESTMENTS_ROUTES),
  ],
  exports: [
  ],
  providers: [],
})
export class InvestmentsModule { }
