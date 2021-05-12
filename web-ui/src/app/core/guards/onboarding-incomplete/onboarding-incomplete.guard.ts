import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PAGE_ROUTES_CONSTANTS } from '../../constants/page-routes';
import { UserService } from '../../services/user/user.service';
import { first, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnboardingIncompleteGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.user$.pipe(map(user => {
      if (!user.onboarding?.completed) {
        return true;
      }
      this.router.navigate(['']);
      return false;
    })).pipe(take(1))
  }

}
