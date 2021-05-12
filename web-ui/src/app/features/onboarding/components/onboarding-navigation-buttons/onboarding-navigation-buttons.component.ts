import { Component, Input, OnInit } from '@angular/core';
import { OnboardingOrchestrator } from '../../onboarding';

@Component({
  selector: 'app-onboarding-navigation-buttons',
  templateUrl: './onboarding-navigation-buttons.component.html',
  styleUrls: ['./onboarding-navigation-buttons.component.scss']
})
export class OnboardingNavigationButtonsComponent implements OnInit {

  @Input() onboardingO: OnboardingOrchestrator;

  constructor() { }

  ngOnInit(): void {
  }

  onNext(): void {
    this.onboardingO.next();
    window.scroll(0, 0);
  }

  onBack(): void {
    this.onboardingO.back();
  }

  onComplete(): void {
    this.onboardingO.complete()
      .then()
      .catch()
  }
}
