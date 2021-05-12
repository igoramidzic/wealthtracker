import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth } from "aws-amplify";
import { from, Observable } from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable()
export class WealthTrackerApiHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(environment.wealthtracker_api_url)) {
      return next.handle(req);
    }

    return from(this.handle(req, next))
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {

    try {
      let session = await Auth.currentSession();

      if (session.isValid()) {
        req = req.clone({ setHeaders: { Authorization: session.getIdToken().getJwtToken() } });
      }
    } catch (e) {

    }

    return next.handle(req).toPromise()
  }
}
