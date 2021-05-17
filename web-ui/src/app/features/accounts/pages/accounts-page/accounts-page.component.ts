import { Component, OnInit } from '@angular/core';
import { IItem } from 'src/app/core/models/item';
import { PlaidService } from 'src/app/core/services/plaid/plaid.service';
import { AccountsService } from '../../../../core/services/accounts/accounts.service';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.scss']
})
export class AccountsPageComponent implements OnInit {

  fetchingItems: boolean;
  errorLoadingItems: boolean;
  items: IItem[];

  constructor(public plaidService: PlaidService, public accountsService: AccountsService) { }

  ngOnInit(): void {
    this.getInitialItems();
    this.accountsService.items$.subscribe(items => {
      this.items = items;
    })
  }

  async getInitialItems(): Promise<void> {
    this.fetchingItems = true;
    this.errorLoadingItems = false;
    try {
      this.items = await this.accountsService.getItems();
    } catch (e) {
      this.errorLoadingItems = true;
    }

    this.fetchingItems = false;
  }

  tryFetchingItemsAgain(): void {
    this.getInitialItems();
  }

  get showItems(): boolean {
    return this.items !== undefined && !this.errorLoadingItems && !this.fetchingItems;
  }

  onAddedAccount(item: IItem): void {
    console.log(item);
    this.items.push(item);
  }
}
