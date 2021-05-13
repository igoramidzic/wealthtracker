import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserService } from '../../../../core/services/user/user.service';
import { environment } from '../../../../../environments/environment';
import { PlaidService } from '../../../../core/services/plaid/plaid.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  environment = environment;

  constructor(public authService: AuthService, public userService: UserService,
    public plaid: PlaidService) { }

  ngOnInit(): void {
  }
}
