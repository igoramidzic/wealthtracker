import { Component, OnInit } from '@angular/core';
import { OnboardingOrchestrator } from '../../onboarding';

@Component({
  selector: 'app-onboarding-page',
  templateUrl: './onboarding-page.component.html',
  styleUrls: ['./onboarding-page.component.scss']
})
export class OnboardingPageComponent implements OnInit {

  onboardingO: OnboardingOrchestrator;

  constructor() {
    this.onboardingO = new OnboardingOrchestrator();
  }

  ngOnInit(): void {
    // this.onboardingOrechestrator.setCurrentAge(-2)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
  }

}
