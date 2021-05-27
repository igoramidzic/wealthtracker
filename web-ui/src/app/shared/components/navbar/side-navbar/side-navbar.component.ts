import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {

  sidebarLinks: ISidebarLink[];

  constructor(public auth: AuthService) {
    this.sidebarLinks = [
      {
        route: '/dashboard',
        iconClass: 'fas fa-border-all'
      },
      {
        route: '/retirement',
        iconClass: 'fas fa-umbrella-beach'
      },
      {
        route: '/investments',
        iconClass: 'fas fa-chart-bar'
      }
    ];
  }

  ngOnInit(): void {
  }

}
interface ISidebarLink {
  iconClass: string;
  route: string;
}
