import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IItem } from 'src/app/core/models/item';
import { PlaidService } from '../../../../core/services/plaid/plaid.service';
import { AccountsService } from '../../../../core/services/accounts/accounts.service';
import { Observable, Subscription } from 'rxjs';
import { PlaidOnSuccessArgs } from 'ngx-plaid-link';

@Component({
  selector: 'app-add-account-button',
  templateUrl: './add-account-button.component.html',
  styleUrls: ['./add-account-button.component.scss']
})
export class AddAccountButtonComponent implements OnInit, OnDestroy {

  @Output() addedAccount: EventEmitter<IItem>;
  successSubscription: Subscription;

  constructor(public plaidService: PlaidService,
    private accountsService: AccountsService) {
    this.addedAccount = new EventEmitter();
  }

  ngOnInit(): void {
    this.successSubscription = this.plaidService.success.subscribe(res => {
      this.addAccount(res.token);
    })
  }

  ngOnDestroy(): void {
    this.successSubscription.unsubscribe();
  }

  async addAccount(public_token: string): Promise<void> {
    try {
      let item = await this.accountsService.addItem(public_token)
      this.addedAccount.emit(item);
    } catch (e) {
      console.log(e);
    }
  }

}
