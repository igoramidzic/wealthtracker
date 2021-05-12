import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { EnvironmentService } from '../environment/environment.service';
import { BehaviorSubject } from 'rxjs';
import { exchangePublicToken } from '../../../../../../server/api/handlers/plaid.handler';
import {
  NgxPlaidLinkService,
  PlaidAccountObject,
  PlaidConfig,
  PlaidErrorMetadata,
  PlaidErrorObject,
  PlaidEventMetadata,
  PlaidLinkHandler,
  PlaidOnEventArgs,
  PlaidOnExitArgs,
  PlaidOnSuccessArgs,
  PlaidSuccessMetadata
} from 'ngx-plaid-link';
import { AccountsResponse } from 'plaid';

@Injectable({
  providedIn: 'root'
})
export class PlaidService {

  private plaidLinkHandler: PlaidLinkHandler;
  private config: PlaidConfig;

  plaidLinkServiceAvailable$: BehaviorSubject<boolean>;

  success: EventEmitter<PlaidOnSuccessArgs>
  event: EventEmitter<PlaidOnEventArgs>
  exit: EventEmitter<PlaidOnExitArgs>

  constructor(private http: HttpClient, private env: EnvironmentService,
    private plaidLinkService: NgxPlaidLinkService) {

    this.success = new EventEmitter();
    this.event = new EventEmitter();
    this.exit = new EventEmitter();

    this.plaidLinkServiceAvailable$ = new BehaviorSubject(false);

    this.config = {
      apiVersion: this.env.plaid.apiVersion,
      clientName: this.env.plaid.clientName,
      env: this.env.plaid.environment,
      onLoad: () => { },
      onSuccess: (token: string, metadata: PlaidSuccessMetadata) => this.onSuccess(token, metadata),
      onExit: (error: PlaidErrorObject, metadata: PlaidErrorMetadata) => this.onExit(error, metadata),
      onEvent: (eventName: string, metadata: PlaidEventMetadata) => this.onEvent(eventName, metadata),
      product: this.env.plaid.products,
      selectAccount: false,
      countryCodes: this.env.plaid.countryCodes
    };

    this.createLinkToken();
  }

  createLinkToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(this.env.apiUrl + '/plaid/link/token/create').toPromise()
        .then((res: { link_token: string }) => {
          this.setLinkToken(res.link_token);
          this.createPlaidLinkHandler();
        })
        .catch(e => console.log(e));
    })
  }

  openPlaidLink(): void {
    this.plaidLinkHandler.open();
  }

  closePlaidLink(): void {
    this.plaidLinkHandler.exit();
  }

  getAccounts(): Promise<AccountsResponse> {
    return this.http.get<AccountsResponse>(this.env.apiUrl + '/plaid/accounts/get').toPromise();
  }

  private exchangePublicToken(public_token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.env.apiUrl + '/plaid/item/public_token/exchange', {
        public_token
      }).toPromise()
        .then((res: any) => {
          resolve();
        })
        .catch(e => reject());
    })
  }

  private createPlaidLinkHandler(): void {
    this.plaidLinkService
      .createPlaid(this.config)
      .then((handler: PlaidLinkHandler) => {
        this.plaidLinkHandler = handler;
        this.plaidLinkServiceAvailable$.next(true);
      })
      .catch(e => console.log(e))
  }

  private onSuccess(token: string, metadata: PlaidSuccessMetadata) {
    this.exchangePublicToken(token)
    this.success.emit({ token, metadata });
  }

  private onEvent(eventName: string, metadata: PlaidEventMetadata) {
    this.event.emit({ eventName, metadata });
  }

  private onExit(error: PlaidErrorObject, metadata: PlaidErrorMetadata) {
    this.exit.emit({ error, metadata });
  }

  private setLinkToken(token: string): void {
    this.config.token = token;
  }
}
