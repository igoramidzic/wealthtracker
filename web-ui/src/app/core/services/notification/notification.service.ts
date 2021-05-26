import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { EPlaidEnvironment } from '../../models/plaid';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: INotification[];

  constructor() {
    this.notifications = [];
    if (environment.plaid.environment == EPlaidEnvironment.SANDBOX) {
      this.addNotification({
        type: ENotificationType.INFO,
        subject: 'Sandbox mode:',
        message: 'user_good pass_good'
      })
    } else if (environment.plaid.environment == EPlaidEnvironment.DEVELOPMENT) {
      this.addNotification({
        type: ENotificationType.INFO,
        subject: 'Development mode:',
        message: 'Use your real bank credentials'
      })
    }
  }

  addNotification(notification: INotification): void {
    this.notifications.push(notification);
  }

  removeNotification(notification: INotification): void {
    this.notifications = this.notifications.filter(notif => notif != notification);
  }
}

export interface INotification {
  type: ENotificationType;
  subject?: string;
  message: string;
}

export enum ENotificationType {
  SUCCESS,
  INFO,
  ERROR,
}
