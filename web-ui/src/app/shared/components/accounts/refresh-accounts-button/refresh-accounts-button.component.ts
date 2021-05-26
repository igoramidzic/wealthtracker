import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../../../core/services/accounts/accounts.service';

@Component({
  selector: 'app-refresh-accounts-button',
  templateUrl: './refresh-accounts-button.component.html',
  styleUrls: ['./refresh-accounts-button.component.scss']
})
export class RefreshAccountsButtonComponent implements OnInit {

  constructor(public accountsService: AccountsService) { }

  ngOnInit(): void {
  }

  refreshAccounts(): void {
    this.accountsService.refreshAccounts();
  }
}
