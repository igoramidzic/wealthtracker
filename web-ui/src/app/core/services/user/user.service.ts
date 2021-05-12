import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUser {

  private user: IUser
  user$: BehaviorSubject<IUser>;
  fetchingUser: boolean;

  get id() { return this.user?.id }
  get name() { return this.user?.name }
  get email() { return this.user?.email }
  get emailVerified() { return this.user?.emailVerified }
  get created() { return this.user?.created }
  get updated() { return this.user?.updated }
  get onboarding() { return this.user?.onboarding }

  constructor(private http: HttpClient) {
    this.user$ = new BehaviorSubject<IUser>(null);
  }

  getUser(): Promise<IUser> {
    return new Promise((resolve, reject) => {
      this.fetchingUser = true;
      this.http.get<IUser>(`${environment.wealthtracker_api_url}/user`)
        .subscribe(user => {
          this.user$.next(user);
          this.user = user;
          resolve(user);
        }, err => {
          reject(err)
        }, () => {
          this.fetchingUser = false;
        })
    })
  }
}
