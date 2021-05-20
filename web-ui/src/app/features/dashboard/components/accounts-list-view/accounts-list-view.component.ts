import { Component, OnInit } from '@angular/core';
import { IItem } from '../../../../core/models/item';
import { EAccountType, IAccount, EAccountDepositorySubtype, EAccountCreditSubtype, EAccountLoanSubtype, EAccountInvestmentSubtype, readableAccountSubType, TAccountSubtype } from '../../../../core/models/account';
import { AccountsService } from '../../../../core/services/accounts/accounts.service';

@Component({
  selector: 'app-accounts-list-view',
  templateUrl: './accounts-list-view.component.html',
  styleUrls: ['./accounts-list-view.component.scss']
})
export class AccountsListViewComponent implements OnInit {

  EAccountType = EAccountType;
  items: IItem[];

  accountsHolder: IAccountsHolder;

  EAccountDepositorySubtype = EAccountDepositorySubtype;
  EAccountCreditSubtype = EAccountCreditSubtype;
  EAccountLoanSubtype = EAccountLoanSubtype;
  EAccountInvestmentSubtype = EAccountInvestmentSubtype;


  cashAndCheckingSubTypes: (EAccountDepositorySubtype | EAccountCreditSubtype)[];

  isCollapsed: boolean;

  constructor(private accountsService: AccountsService) {
  }

  ngOnInit(): void {
    this.accountsService.items$.subscribe(items => {
      this.items = items;
      this.breakApartAndCalculateDifferentGroupsOfAccounts(items);
    });
    if (!this.accountsService.items)
      this.accountsService.getItems()
        .then()
        .catch(e => console.log(e));
    else {
      this.items = this.accountsService.items;
      this.breakApartAndCalculateDifferentGroupsOfAccounts(this.items);
    }
  }

  getAccountsCombinedFromAllItems(items: IItem[]): IAccount[] {
    return [].concat.apply([], items.map(item => item.accounts));
  }

  breakApartAndCalculateDifferentGroupsOfAccounts(items: IItem[]): void {
    let accounts: IAccount[] = this.getAccountsCombinedFromAllItems(items);

    let cashAccounts = this.filterAccountsByType(accounts, [EAccountType.DEPOSITORY]);
    let creditAccounts = this.filterAccountsByType(accounts, [EAccountType.CREDIT]);
    let loanAccounts = this.filterAccountsByType(accounts, [EAccountType.LOAN]);
    let investmentAccounts = this.filterAccountsByType(accounts, [EAccountType.INVESTMENT]);

    this.accountsHolder = {
      netWorth: this.getTotalBalanceForAccounts(accounts),
      accountTypes: [
        {
          title: 'Cash',
          type: EAccountType.DEPOSITORY,
          accounts: cashAccounts,
          balance: this.getTotalBalanceForAccounts(cashAccounts)
        },
        {
          title: 'Credit',
          type: EAccountType.CREDIT,
          accounts: creditAccounts,
          balance: this.getTotalBalanceForAccounts(creditAccounts)
        },
        {
          title: 'Investments',
          type: EAccountType.INVESTMENT,
          accounts: investmentAccounts,
          balance: this.getTotalBalanceForAccounts(investmentAccounts)
        },
        {
          title: 'Loans',
          type: EAccountType.LOAN,
          accounts: loanAccounts,
          balance: this.getTotalBalanceForAccounts(loanAccounts)
        }
      ]
    }
  }

  filterAccountsByType(accounts, types: EAccountType[]): IAccount[] {
    return accounts
      .filter(account => !!types.find(type => type == account.type));
  }

  getTotalBalanceForAccounts(accounts: IAccount[]): number {
    if (accounts.length == 0) return 0;
    return accounts.map(account => {
      if (account.type == EAccountType.CREDIT || account.type == EAccountType.LOAN)
        return -1 * account.balances.current;
      return account.balances.current;
    }).reduce((total, amount) => total + amount);
  }

  get isLoadingItems(): boolean {
    return !this.items;
  }

  getReadableAccountSubType(subtype: TAccountSubtype): string {
    return readableAccountSubType(subtype);
  }
}



interface IAccountsHolder {
  netWorth: number;
  accountTypes: IAccountsAndBalance[];
}

interface IAccountsAndBalance {
  title: string;
  type: EAccountType;
  balance: number;
  accounts: IAccount[];
}
