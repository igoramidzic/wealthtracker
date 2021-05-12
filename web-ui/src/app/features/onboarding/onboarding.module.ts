import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OnboardingComponent } from './onboarding.component';
import { OnboardingPageComponent } from './pages/onboarding-page/onboarding-page.component';
import { ONBOARDING_ROUTES } from './onboarding.routes';
import { OnboardingProgressComponent } from './components/onboarding-progress/onboarding-progress.component';
import { OnboardingQuestionChooserComponent } from './components/onboarding-question-chooser/onboarding-question-chooser.component';
import { OnboardingCurrentAgeQuestionComponent } from './components/onboarding-questions/onboarding-current-age-question/onboarding-current-age-question.component';
import { OnboardingNavigationButtonsComponent } from './components/onboarding-navigation-buttons/onboarding-navigation-buttons.component';
import { OnboardingRetirementAgeQuestionComponent } from './components/onboarding-questions/onboarding-retirement-age-question/onboarding-retirement-age-question.component';
import { OnboardingExpectedInvestmentYieldQuestionComponent } from './components/onboarding-questions/onboarding-expected-investment-yield-question/onboarding-expected-investment-yield-question.component';
import { OnboardingCompleteMessageComponent } from './components/onboarding-complete-message/onboarding-complete-message.component';
import { OnboardingSavingComponent } from './components/onboarding-saving/onboarding-saving.component';

@NgModule({
  declarations: [
    OnboardingComponent,
    OnboardingPageComponent,
    OnboardingProgressComponent,
    OnboardingQuestionChooserComponent,
    OnboardingCurrentAgeQuestionComponent,
    OnboardingNavigationButtonsComponent,
    OnboardingRetirementAgeQuestionComponent,
    OnboardingExpectedInvestmentYieldQuestionComponent,
    OnboardingCompleteMessageComponent,
    OnboardingSavingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ONBOARDING_ROUTES),
  ],
  exports: [
  ],
  providers: [],
})
export class OnboardingModule { }
