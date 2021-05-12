import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserService } from '../../services/user/user.service';
import { OopsService } from '../../services/oops/oops.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router, private oopsService: OopsService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.userService.getUser()
        .then(user => {
          resolve(true);
        })
        .catch(err => {
          this.oopsService.setWhatWentWrong("Could not retrieve your account.");
          this.router.navigate(['/oops'])
          reject(false);
        })
    })
  }

}
