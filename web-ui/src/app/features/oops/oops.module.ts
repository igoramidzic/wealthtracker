import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OOPS_ROUTES } from './oops.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { OopsComponent } from './oops.component';

@NgModule({
  declarations: [
    OopsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(OOPS_ROUTES),
  ],
  exports: [
  ],
  providers: [],
})
export class OopsModule { }
