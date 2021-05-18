import { Component, Input, OnInit } from '@angular/core';
import { IItem } from '../../../../core/models/item';
import { EAccountType, EAccountSubtype, IAccount, EAccountDepositorySubtype, EAccountCreditSubtype } from '../../../../core/models/account';

@Component({
  selector: 'app-accounts-list-view',
  templateUrl: './accounts-list-view.component.html',
  styleUrls: ['./accounts-list-view.component.scss']
})
export class AccountsListViewComponent implements OnInit {

  EAccountType = EAccountType;
  EAccountSubtype = EAccountSubtype;
  @Input() items: IItem[];

  bankingTypes: EAccountType[];
  investmentTypes: EAccountType[];
  loanTypes: EAccountType[];

  cashAndCheckingSubTypes: (EAccountDepositorySubtype | EAccountCreditSubtype)[];

  constructor() {
    this.bankingTypes = [
      EAccountType.DEPOSITORY,
      EAccountType.CREDIT
    ];

    this.investmentTypes = [
      EAccountType.INVESTMENT
    ];

    this.loanTypes = [
      EAccountType.LOAN
    ];

    this.cashAndCheckingSubTypes = [
      EAccountDepositorySubtype.CHECKING,
      // TODO: add all of them. I'm going to bed...
    ];
  }

  ngOnInit(): void {
  }

  getTotalBalanceByTypes(types: EAccountType[]): number {
    let grandTotal = 0;
    this.items.forEach(item => {
      grandTotal += item.accounts
        .filter(account => {
          return !!types.find(type => type == account.type)
        })
        .map(account => {
          if (account.type == EAccountType.CREDIT || account.type == EAccountType.LOAN)
            return -1 * account.balances.current;
          return account.balances.current;
        })
        .reduce((total, balance) => {
          return total + balance;
        });
    });
    return grandTotal;
  }

  getTotalBalanceBySubtypes(subtypes: EAccountSubtype[]): number {
    let total = 0;
    this.items.forEach(item => {
      total += item.accounts
        .filter(account => !!subtypes.find(subtype => subtype == account.subtype))
        .map(account => {
          if (account.type == EAccountType.CREDIT || account.type == EAccountType.LOAN)
            return -1 * account.balances.current;
          return account.balances.current;
        })
        .reduce((total, balance) => total + balance);
    });
    return total;
  }

  getAccountsBySubtype(subtypes: EAccountSubtype[]): IAccount[] {
    if (!this.items) return null;

    let accounts: IAccount[] = [];

    this.items.forEach(item => {
      let itemAccounts: IAccount[] = item.accounts.filter(account => !!subtypes.find(subtype => subtype == account.subtype));
      accounts = accounts.concat(itemAccounts);
    });

    return accounts;
  }

  getAccountsByType(type: EAccountType): IAccount[] {
    if (!this.items) return null;

    let accounts: IAccount[] = [];

    this.items.forEach(item => {
      let itemAccounts: IAccount[] = item.accounts.filter(account => account.type == type);
      accounts = accounts.concat(itemAccounts);
    });

    return accounts;
  }

  getAccountsTotal(accounts: IAccount[]): number {
    return accounts.map(account => account.balances.current).reduce((total, amount) => total + amount);
  }
}

interface IAccountsByType {
  type: EAccountType,
  subtypes: IAccountsBySubtype[];
}

interface IAccountsBySubtype {
  subtype: EAccountSubtype;
  accounts: IAccount[];
}
