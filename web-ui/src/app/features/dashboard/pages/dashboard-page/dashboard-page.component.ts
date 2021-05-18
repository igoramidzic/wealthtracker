import { Component, OnInit } from '@angular/core';
import { PAGE_ROUTES_CONSTANTS } from '../../../../core/constants/page-routes';
import { AccountsService } from '../../../../core/services/accounts/accounts.service';
import { IItem } from '../../../../core/models/item';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  items: IItem[];
  PAGE_ROUTES_CONSTANTS = PAGE_ROUTES_CONSTANTS;

  constructor(private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.getInitialItems();
  }

  async getInitialItems(): Promise<void> {
    try {
      this.items = await this.accountsService.getItems();
    } catch (e) {
      console.log(e);
    }
  }
}
