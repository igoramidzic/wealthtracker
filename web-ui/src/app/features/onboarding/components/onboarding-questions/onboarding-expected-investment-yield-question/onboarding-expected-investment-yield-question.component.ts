import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OnboardingOrchestrator } from '../../../onboarding';

@Component({
  selector: 'app-onboarding-expected-investment-yield-question',
  templateUrl: './onboarding-expected-investment-yield-question.component.html',
  styleUrls: ['./onboarding-expected-investment-yield-question.component.scss']
})
export class OnboardingExpectedInvestmentYieldQuestionComponent implements OnInit {

  @Input() onboardingO: OnboardingOrchestrator;
  @Output() completed: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if (!this.onboardingO)
      throw new Error("Expecting the OnboardingOrchestrator")
  }

  onChange(investmentYield: number): void {
    this.onboardingO.setExpectedInvestmentYield(investmentYield);
  }
}
