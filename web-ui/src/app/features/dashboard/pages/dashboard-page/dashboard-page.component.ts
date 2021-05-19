import { Component, OnInit } from '@angular/core';
import { PAGE_ROUTES_CONSTANTS } from '../../../../core/constants/page-routes';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  PAGE_ROUTES_CONSTANTS = PAGE_ROUTES_CONSTANTS;

  constructor() { }

  ngOnInit(): void {
  }

}
