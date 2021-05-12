import { Component, Input, OnInit } from '@angular/core';
import { OnboardingOrchestrator } from '../../../onboarding';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-onboarding-retirement-age-question',
  templateUrl: './onboarding-retirement-age-question.component.html',
  styleUrls: ['./onboarding-retirement-age-question.component.scss']
})
export class OnboardingRetirementAgeQuestionComponent implements OnInit {

  @Input() onboardingO: OnboardingOrchestrator;

  sliderOptions: Options;

  constructor() { }

  ngOnInit(): void {
    if (!this.onboardingO)
      throw new Error("Expecting the OnboardingOrchestrator")

    this.sliderOptions = {
      floor: this.onboardingO.currentAge + 1,
      ceil: 100,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Floor:
            return '<b>Young</b>';
          case LabelType.Ceil:
            return '<b>Old</b>';
          default:
            return "" + value;
        }
      }
    }
  }

  onChange(retirementAge: number): void {
    this.onboardingO.setRetirementAge(retirementAge);
  }

}
