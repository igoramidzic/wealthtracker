import { Component, Input, OnInit } from '@angular/core';
import { OnboardingOrchestrator } from '../../onboarding';

@Component({
  selector: 'app-onboarding-progress',
  templateUrl: './onboarding-progress.component.html',
  styleUrls: ['./onboarding-progress.component.scss']
})
export class OnboardingProgressComponent implements OnInit {

  @Input() onboardingO: OnboardingOrchestrator;

  constructor() { }

  ngOnInit(): void {
    if (!this.onboardingO)
      throw new Error("Expecting the OnboardingOrchestrator")
  }
}
