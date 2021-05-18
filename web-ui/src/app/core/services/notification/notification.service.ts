import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: INotification[];

  constructor() {
    this.notifications = [];
    this.addNotification({
      type: ENotificationType.INFO,
      subject: 'Sandbox mode:',
      message: 'user_good pass_good'
    })
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
