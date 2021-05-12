import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthNextStep, AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmailConfirmationAuthedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.nextStep != AuthNextStep.ConfirmEmail || this.authService.userDetails.email == null) {
      this.router.navigate(['/']);
      return false
    }
    return true;
  }

}
