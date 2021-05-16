import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { AlertNavAlertType } from '../../models/alertnav';
import { environment } from '../../../../environments/environment';
import { EPlaidEnvironment } from '../../models/plaid';

@Injectable({
  providedIn: 'root'
})
export class AlertnavService {

  alertMessages: Message[];

  constructor() {
    this.alertMessages = [];
    this.notifyPlaidEnvironment();
  }

  notifyPlaidEnvironment(): void {
    let message: Message;

    switch (environment.plaid.environment) {
      case EPlaidEnvironment.SANDBOX:
        message = { severity: AlertNavAlertType.INFO, summary: 'Plaid Sandbox mode', detail: 'user_good, pass_good' };
        break;
      case EPlaidEnvironment.DEVELOPMENT:
        message = { severity: AlertNavAlertType.INFO, summary: 'Plaid Development mode', detail: 'Use your real bank details.' };
        break;
      case EPlaidEnvironment.PRODUCTION:
        message = { severity: AlertNavAlertType.INFO, summary: 'Plaid Production mode', detail: 'Finally made it to Prod.' };
        break;
      default:
        break;
    }

    this.alertMessages.push(message);
  }
}
