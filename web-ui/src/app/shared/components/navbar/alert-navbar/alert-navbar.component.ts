import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { AlertnavService } from '../../../../core/services/alertnav/alertnav.service';

@Component({
  selector: 'app-alert-navbar',
  templateUrl: './alert-navbar.component.html',
  styleUrls: ['./alert-navbar.component.scss']
})
export class AlertNavbarComponent implements OnInit {

  msgs1: Message[];

  constructor(public alertnavService: AlertnavService) {
  }

  ngOnInit(): void {

  }

}
