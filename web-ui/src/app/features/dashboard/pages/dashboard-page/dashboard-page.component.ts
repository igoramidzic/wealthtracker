import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserService } from '../../../../core/services/user/user.service';
import { environment } from '../../../../../environments/environment';
import { PlaidService } from '../../../../core/services/plaid/plaid.service';
import { PlaidOnSuccessArgs } from 'ngx-plaid-link';
import { AccountService } from '../../../../core/services/item/item.service';
import { IItem } from '../../../../core/models/item';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  environment = environment;

  successRes: PlaidOnSuccessArgs;
  items: IItem[];

  constructor(public authService: AuthService, public userService: UserService,
    public plaid: PlaidService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.items = [];
    this.plaid.success.subscribe(res => {
      this.successRes = res;
      this.addAccount(res.token);
      this.getAccounts();
    })
    this.getAccounts();
  }

  addAccount(token: string): void {
    this.accountService.addItem(token)
      .then(item => {
        console.log(item);
        this.items.push(item)
      })
      .catch(err => {
        console.log(err);
      })
  }

  getAccounts(): void {
    this.accountService.getItems()
      .then(items => {
        console.log(items)
        this.items = items;
      })
      .catch(err => {
        console.log(err)
      })
  }
}
