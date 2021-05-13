import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OnboardingOrchestrator } from '../../onboarding';
import { OnboardingService } from '../../services/onboarding.service';

@Component({
  selector: 'app-onboarding-page',
  templateUrl: './onboarding-page.component.html',
  styleUrls: ['./onboarding-page.component.scss'],
  providers: [MessageService]
})
export class OnboardingPageComponent implements OnInit {

  errorMessage: string;
  hasError: boolean;
  completing: boolean;
  onboardingO: OnboardingOrchestrator;

  constructor(private onboardingService: OnboardingService, private messageService: MessageService) {
    this.completing = false;
    this.errorMessage = "";
    this.hasError = false;
    this.onboardingO = new OnboardingOrchestrator();
  }

  ngOnInit(): void {
    // this.onboardingOrechestrator.setCurrentAge(-2)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
  }

  async onCompleteOnboarding(): Promise<void> {
    this.completing = true;

    try {

      await this.onboardingService.completeOnboarding({ completed: true });
      this.hasError = false;
    } catch (e) {
      this.errorMessage = e;
      this.hasError = true;
    }

    this.completing = false;
  }

  message(): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

  }
}
