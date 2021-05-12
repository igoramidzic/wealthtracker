import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OnboardingOrchestrator } from '../../../onboarding';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-onboarding-current-age-question',
  templateUrl: './onboarding-current-age-question.component.html',
  styleUrls: ['./onboarding-current-age-question.component.scss']
})
export class OnboardingCurrentAgeQuestionComponent implements OnInit {

  @Input() onboardingO: OnboardingOrchestrator;
  @Output() completed: EventEmitter<void> = new EventEmitter();
  sliderOptions: Options;

  constructor() { }

  ngOnInit(): void {
    if (!this.onboardingO)
      throw new Error("Expecting the OnboardingOrchestrator")

    this.sliderOptions = {
      floor: 0,
      ceil: 90,
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

  onChange(currentAge: number): void {
    this.onboardingO.setCurrentAge(currentAge);
  }
}
