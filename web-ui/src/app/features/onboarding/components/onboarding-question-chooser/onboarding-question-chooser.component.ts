import { Component, Input, OnInit } from '@angular/core';
import { EOnboardingQuestion, OnboardingOrchestrator } from '../../onboarding';

@Component({
  selector: 'app-onboarding-question-chooser',
  templateUrl: './onboarding-question-chooser.component.html',
  styleUrls: ['./onboarding-question-chooser.component.scss']
})
export class OnboardingQuestionChooserComponent implements OnInit {

  @Input() onboardingO: OnboardingOrchestrator;
  EOnboardingQuestion = EOnboardingQuestion;

  constructor() { }

  ngOnInit(): void {
  }

}
