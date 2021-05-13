import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOnboarding } from '../../../../../../backend/src/models/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor(private router: Router, private http: HttpClient,
    private userService: UserService) { }

  async completeOnboarding(onboarding: IOnboarding): Promise<void> {
    try {
      let newOnboarding = await this.http.post<IOnboarding>(`${environment.wealthtracker_api_url}/onboarding/complete`, onboarding).toPromise();
      this.userService.setOnboarding(newOnboarding);
      this.router.navigate(['']);
    } catch (e) {
      throw e;
    }
  }
}
