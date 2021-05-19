import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IItem } from '../../../../core/models/item';
import { EAccountType, TAccountSubtype, IAccount, EAccountDepositorySubtype, EAccountCreditSubtype, EAccountLoanSubtype, EAccountInvestmentSubtype } from '../../../../core/models/account';
import { Checking_Cash_Subtypes, Credit_Subtypes, Savings_Subtypes } from 'src/app/core/constants/account-type-groups';
import { Investment_Retirement_Account_Subtypes, Investment_Brokerage_Account_Subtypes, Investment_Other_Subtypes } from '../../../../core/constants/account-type-groups';
import { AccountsService } from '../../../../core/services/accounts/accounts.service';

@Component({
  selector: 'app-accounts-list-view',
  templateUrl: './accounts-list-view.component.html',
  styleUrls: ['./accounts-list-view.component.scss']
})
export class AccountsListViewComponent implements OnInit {

  EAccountType = EAccountType;
  // EAccountSubtype = TAccountSubtype;
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
      let accounts: IAccount[] = this.getAccountsCombinedFromAllItems(this.items);
      console.log(accounts);
      this.breakApartAndCalculateDifferentGroupsOfAccounts(accounts);
    });
    if (!this.accountsService.items)
      this.accountsService.getItems()
        .then()
        .catch(e => console.log(e));
  }

  getAccountsCombinedFromAllItems(items: IItem[]): IAccount[] {
    return [].concat.apply([], items.map(item => item.accounts));
  }

  breakApartAndCalculateDifferentGroupsOfAccounts(accounts: IAccount[]): void {
    let bankingAccounts = this.breakApartAndCalculateBankingAccounts(accounts);
    let loanAccounts = this.breakApartAndCalculateLoanAccounts(accounts);
    let investmentAccounts = this.breakApartAndCalculateInvestmentAccounts(accounts);

    this.accountsHolder = {
      accounts,
      balance: this.getTotalBalanceForAccounts(accounts),
      bankingAccounts: bankingAccounts,
      loanAccounts,
      investmentAccounts
    }
  }

  breakApartAndCalculateBankingAccounts(accounts: IAccount[]): IBankingAccounts {
    accounts = this.filterAccountsByType(accounts, [EAccountType.DEPOSITORY, EAccountType.CREDIT]);

    let cashAndCheckingAccounts = this.filterAccountsBySubtype(accounts, Checking_Cash_Subtypes);
    accounts = accounts.filter(account1 => !cashAndCheckingAccounts.find(account2 => account2.accountId == account1.accountId))
    let creditAccounts = this.filterAccountsBySubtype(accounts, Credit_Subtypes);
    accounts = accounts.filter(account1 => !creditAccounts.find(account2 => account2.accountId == account1.accountId))
    let savingsAccounts = this.filterAccountsBySubtype(accounts, Savings_Subtypes);
    accounts = accounts.filter(account1 => !savingsAccounts.find(account2 => account2.accountId == account1.accountId))

    let allAccounts: IAccount[] = cashAndCheckingAccounts.concat(creditAccounts).concat(savingsAccounts).concat(accounts);

    let bankingAccounts: IBankingAccounts = {
      allAccounts: {
        balance: this.getTotalBalanceForAccounts(allAccounts),
        accounts: allAccounts
      },
      cashAndCheckingAccounts: {
        balance: this.getTotalBalanceForAccounts(cashAndCheckingAccounts),
        accounts: cashAndCheckingAccounts
      },
      creditAccounts: {
        balance: this.getTotalBalanceForAccounts(creditAccounts),
        accounts: creditAccounts
      },
      savingsAccounts: {
        balance: this.getTotalBalanceForAccounts(savingsAccounts),
        accounts: savingsAccounts
      },
      otherAccounts: {
        balance: this.getTotalBalanceForAccounts(accounts),
        accounts: accounts
      }
    }

    return bankingAccounts;
  }

  breakApartAndCalculateLoanAccounts(accounts: IAccount[]): ILoanAccounts {
    accounts = this.filterAccountsByType(accounts, [EAccountType.LOAN]);

    let mortgageAccounts = this.filterAccountsBySubtype(accounts, [EAccountLoanSubtype.MORTGAGE]);
    accounts = accounts.filter(account1 => !mortgageAccounts.find(account2 => account2.accountId == account1.accountId))
    let autoAccounts = this.filterAccountsBySubtype(accounts, [EAccountLoanSubtype.AUTO]);
    accounts = accounts.filter(account1 => !autoAccounts.find(account2 => account2.accountId == account1.accountId))
    let studentAccounts = this.filterAccountsBySubtype(accounts, [EAccountLoanSubtype.STUDENT]);
    accounts = accounts.filter(account1 => !studentAccounts.find(account2 => account2.accountId == account1.accountId))

    let allAccounts: IAccount[] = mortgageAccounts.concat(autoAccounts).concat(studentAccounts).concat(accounts);

    let loanAccounts: ILoanAccounts = {
      allAccounts: {
        balance: this.getTotalBalanceForAccounts(allAccounts),
        accounts: allAccounts
      },
      mortgageAccounts: {
        balance: this.getTotalBalanceForAccounts(mortgageAccounts),
        accounts: mortgageAccounts
      },
      autoAccounts: {
        balance: this.getTotalBalanceForAccounts(autoAccounts),
        accounts: autoAccounts
      },
      studentAccounts: {
        balance: this.getTotalBalanceForAccounts(studentAccounts),
        accounts: studentAccounts
      },
      otherAccounts: {
        balance: this.getTotalBalanceForAccounts(accounts),
        accounts: accounts
      }
    }

    return loanAccounts;
  }

  breakApartAndCalculateInvestmentAccounts(accounts: IAccount[]): IInvestmentAccounts {
    accounts = this.filterAccountsByType(accounts, [EAccountType.INVESTMENT]);

    let brokerageAccounts = this.filterAccountsBySubtype(accounts, Investment_Brokerage_Account_Subtypes);
    accounts = accounts.filter(account1 => !brokerageAccounts.find(account2 => account2.accountId == account1.accountId))
    let retirementAccounts = this.filterAccountsBySubtype(accounts, Investment_Retirement_Account_Subtypes);
    accounts = accounts.filter(account1 => !retirementAccounts.find(account2 => account2.accountId == account1.accountId))

    let allAccounts: IAccount[] = brokerageAccounts.concat(retirementAccounts).concat(accounts);

    let investmentAccounts: IInvestmentAccounts = {
      allAccounts: {
        balance: this.getTotalBalanceForAccounts(allAccounts),
        accounts: allAccounts
      },
      retirementAccounts: {
        balance: this.getTotalBalanceForAccounts(retirementAccounts),
        accounts: retirementAccounts
      },
      brokerageAccounts: {
        balance: this.getTotalBalanceForAccounts(brokerageAccounts),
        accounts: brokerageAccounts
      },
      otherAccounts: {
        balance: this.getTotalBalanceForAccounts(accounts),
        accounts: accounts
      }
    }

    return investmentAccounts;
  }

  filterAccountsByType(accounts, types: EAccountType[]): IAccount[] {
    return accounts
      .filter(account => !!types.find(type => type == account.type));
  }

  filterAccountsBySubtype(accounts: IAccount[], subtypes: TAccountSubtype[]): IAccount[] {
    return accounts
      .filter(account => !!subtypes.find(subtype => subtype == account.subtype))
  }

  getTotalBalanceForAccounts(accounts: IAccount[]): number {
    if (accounts.length == 0) return 0;
    return accounts.map(account => {
      if (account.type == EAccountType.CREDIT || account.type == EAccountType.LOAN)
        return -1 * account.balances.current;
      return account.balances.current;
    }).reduce((total, amount) => total + amount);
  }
}

interface IAccountsHolder extends IAccountsAndBalance {
  bankingAccounts: IBankingAccounts;
  loanAccounts: ILoanAccounts;
  investmentAccounts: IInvestmentAccounts;
}

interface IAccountGroup {
  allAccounts: IAccountsAndBalance;
  otherAccounts: IAccountsAndBalance;
}

interface IBankingAccounts extends IAccountGroup {
  cashAndCheckingAccounts: IAccountsAndBalance;
  creditAccounts: IAccountsAndBalance;
  savingsAccounts: IAccountsAndBalance;
}

interface IInvestmentAccounts extends IAccountGroup {
  retirementAccounts: IAccountsAndBalance;
  brokerageAccounts: IAccountsAndBalance;
}

interface ILoanAccounts extends IAccountGroup {
  mortgageAccounts: IAccountsAndBalance;
  autoAccounts: IAccountsAndBalance;
  studentAccounts: IAccountsAndBalance;
}

interface IAccountsAndBalance {
  balance: number;
  accounts: IAccount[];
}
