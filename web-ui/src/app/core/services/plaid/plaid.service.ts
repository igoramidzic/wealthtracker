import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  PlaidErrorMetadata,
  PlaidErrorObject,
  PlaidEventMetadata,
  PlaidOnEventArgs,
  PlaidOnExitArgs,
  PlaidOnSuccessArgs,
  PlaidSuccessMetadata,
  PlaidConfig,
  NgxPlaidLinkService,
  PlaidLinkHandler
} from "ngx-plaid-link";
import { AccountsResponse } from 'plaid';
import { environment } from '../../../../environments/environment';

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

  constructor(private http: HttpClient,
    private plaidLinkService: NgxPlaidLinkService) {

    this.success = new EventEmitter();
    this.event = new EventEmitter();
    this.exit = new EventEmitter();

    this.plaidLinkServiceAvailable$ = new BehaviorSubject(false);

    this.config = {
      apiVersion: environment.plaid.apiVersion,
      clientName: environment.plaid.clientName,
      env: environment.plaid.environment,
      onLoad: () => { },
      onSuccess: (token: string, metadata: PlaidSuccessMetadata) => this.onSuccess(token, metadata),
      onExit: (error: PlaidErrorObject, metadata: PlaidErrorMetadata) => this.onExit(error, metadata),
      onEvent: (eventName: string, metadata: PlaidEventMetadata) => this.onEvent(eventName, metadata),
      product: environment.plaid.products,
      selectAccount: false,
      countryCodes: environment.plaid.countryCodes
    };

    this.createLinkToken();
  }

  createLinkToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.wealthtracker_api_url + '/plaid/link/token').toPromise()
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
    return this.http.get<AccountsResponse>(environment.wealthtracker_api_url + '/plaid/accounts/get').toPromise();
  }

  private exchangePublicToken(public_token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.wealthtracker_api_url + '/plaid/item/public_token/exchange', {
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
    // this.exchangePublicToken(token)
    console.log(token, metadata)
    this.success.emit({ token, metadata });
  }

  private onEvent(eventName: string, metadata: PlaidEventMetadata) {
    console.log(eventName, metadata)
    this.event.emit({ eventName, metadata });
  }

  private onExit(error: PlaidErrorObject, metadata: PlaidErrorMetadata) {
    console.log(error, metadata)
    this.exit.emit({ error, metadata });
  }

  private setLinkToken(token: string): void {
    this.config.token = token;
  }
}
