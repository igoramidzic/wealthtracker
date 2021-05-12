import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OopsService } from '../../services/oops/oops.service';

@Injectable({
  providedIn: 'root'
})
export class OopsGuard implements CanActivate {

  constructor(private oopsService: OopsService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.oopsService.hasError) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }

}
