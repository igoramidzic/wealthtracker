import { Component, OnInit } from '@angular/core';
import { OopsService } from '../../core/services/oops/oops.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-oops',
  templateUrl: './oops.component.html',
  styleUrls: ['./oops.component.scss']
})
export class OopsComponent implements OnInit {

  constructor(public oopsService: OopsService, public authService: AuthService) { }

  ngOnInit(): void {
  }

}
