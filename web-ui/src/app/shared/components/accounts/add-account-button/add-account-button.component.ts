import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IItem } from 'src/app/core/models/item';
import { PlaidService } from '../../../../core/services/plaid/plaid.service';
import { AccountService } from '../../../../core/services/item/item.service';

@Component({
  selector: 'app-add-account-button',
  templateUrl: './add-account-button.component.html',
  styleUrls: ['./add-account-button.component.scss']
})
export class AddAccountButtonComponent implements OnInit {

  @Output() addedAccount: EventEmitter<IItem>;

  constructor(public plaidService: PlaidService,
    private accountsService: AccountService) {
    this.addedAccount = new EventEmitter();
  }

  ngOnInit(): void {
    this.plaidService.success.subscribe(res => {
      this.addAccount(res.token);
    })
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
