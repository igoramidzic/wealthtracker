import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { UserService } from '../../../../core/services/user/user.service';
import { environment } from '../../../../../environments/environment';
import { PlaidService } from '../../../../core/services/plaid/plaid.service';
import { PlaidOnSuccessArgs } from 'ngx-plaid-link';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  environment = environment;

  successRes: PlaidOnSuccessArgs;

  constructor(public authService: AuthService, public userService: UserService,
    public plaid: PlaidService) {
    this.successRes = {
      token: '',
      metadata: {
        account: { id: null, name: null, type: null, subtype: null, mask: null },
        account_id: null,
        accounts: [
          { id: "LBWvWGJXJBFr5W8owjAjf1v1gArJv8FP1E7R8", name: "Plaid Checking", mask: "0000", type: "depository", subtype: "checking" },
          { id: "pxzNzbv4vxfwzyZa4LvLf676Lrpk7ZcLBzwWG", name: "Plaid Saving", mask: "1111", type: "depository", subtype: "savings" },
          { id: "o3r4rZvav3HQrvnW4ZaZu5D5ZMXADdhRgbjzm", name: "Plaid CD", mask: "2222", type: "depository", subtype: "cd" },
          { id: "gy8K8woqoyHXeLQJd8m8TPrPR9AJroCgz5owG", name: "Plaid Credit Card", mask: "3333", type: "credit", subtype: "credit card" },
          { id: "813e34gXg1Hxd6bzMPEPUA1Awkrm1JSwM8nGQ", name: "Plaid Money Market", mask: "4444", type: "depository", subtype: "money market" },
          { id: "Ey1G1RJXJyHW5e3rL4v4frGr5mJpGBtXGmy1Z", name: "Plaid IRA", mask: "5555", type: "investment", subtype: "ira" },
          { id: "WQdvdw3n3QSj54ywbM7Mi3o3NVEroAtlnjRDW", name: "Plaid 401k", mask: "6666", type: "investment", subtype: "401k" },
          { id: "AGe8e5JXJGHoZWDjmPbPf7j7KlBGjwh1Z58d1", name: "Plaid Student Loan", mask: "7777", type: "loan", subtype: "student" },
          { id: "GlpvpbJXJlfD5Jv38WwWfPePDMg1eaC1moaQ6", name: "Plaid Mortgage", mask: "8888", type: "loan", subtype: "mortgage" },
        ],
        institution: { name: "Wells Fargo", institution_id: "ins_4" },
        link_session_id: "acec2748-5db1-4f1d-b513-c466a394a9eb",
        public_token: "public-sandbox-1a31b840-8917-420f-95af-2eec6ae0e83b"
      }
    }
  }

  ngOnInit(): void {
    this.plaid.success.subscribe(res => {
      this.successRes = res;
    })
  }
}
