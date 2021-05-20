export interface IAccount {
  accountId: string;
  balances: {
    available: number;
    current: number;
    isoCurrencyCode: string;
  },
  mask: string;
  name: string;
  officialName: string;
  subtype: EAccountDepositorySubtype | EAccountCreditSubtype | EAccountLoanSubtype | EAccountInvestmentSubtype;
  type: EAccountType;
}

export enum EAccountType {
  DEPOSITORY = 'depository',
  CREDIT = 'credit',
  INVESTMENT = 'investment',
  LOAN = 'loan'
}

export enum EAccountDepositorySubtype {
  CHECKING = 'checking',
  SAVINGS = 'savings',
  HSA = 'hsa',
  CD = 'cd',
  MONEY_MARKET = 'money market',
  PAYPAL = 'paypal',
  PREPAID = 'prepaid',
  CASH_MANAGEMENT = 'cash management',
  EBT = 'ebt'
}

export enum EAccountCreditSubtype {
  CREDIT_CARD = 'credit card',
  PAYPAL = 'paypal'
}

export enum EAccountLoanSubtype {
  AUTO = 'auto',
  BUSINESS = 'business',
  COMMERCIAL = 'commercial',
  CONSUMER = 'consumer',
  HOME_EQUITY = 'home equity',
  LOAN = 'loan',
  MORTGAGE = 'mortgage',
  OVERDRAFT = 'overdraft',
  LINE_OF_CREDIT = 'line of credit',
  STUDENT = 'student',
  OTHER = 'other'
}

export enum EAccountInvestmentSubtype {
  FIVE29 = '529',
  FOUR01a = '401a',
  FOUR01k = '401k',
  FOUR03b = '403b',
  FOUR57b = '457b',
  BROKERAGE = 'brokerage',
  CASHISA = 'cash isa',
  EDUCATION_SAVINGS_ACCOUNT = 'education savings account',
  FIXED_ANNUITY = 'fixed annuity',
  GIC = 'gic',
  HEALTH_REIMBURSEMENT_ARRANGEMENT = 'health reimbursement arrangement',
  HSA = 'hsa',
  IRA = 'ira',
  ISA = 'isa',
  KEOGH = 'keogh',
  LIF = 'lif',
  LIRA = 'lira',
  LRIF = 'lrif',
  LRSP = 'lrsp',
  MUTUAL_FUND = 'mutual fund',
  NONTAXABLE_BROKERAGE_ACCOUNT = 'non-taxable brokerage account',
  PENSION = 'pension',
  PRIF = 'prif',
  PROFIT_SHARING_PLAN = 'profit sharing plan',
  QSHR = 'qshr',
  RDSP = 'rdsp',
  RESP = 'resp',
  RETIREMENT = 'retirement',
  RLIF = 'rlif',
  ROTH = 'roth',
  ROTH_401K = 'roth 401k',
  RRIF = 'rrif',
  RRSP = 'rrsp',
  SARSEP = 'sarsep',
  SEPIRA = 'sepira',
  SIMPLE_IRA = 'simple ira',
  SIPP = 'sipp',
  STOCK_PLAN = 'stock plan',
  TFSA = 'tfsa',
  TRUST = 'trust',
  UGMA = 'ugma',
  UTMA = 'utma',
  VARIABLE_ANNUITY = 'variable annuity'
}

export type TAccountSubtype = EAccountDepositorySubtype | EAccountCreditSubtype | EAccountLoanSubtype | EAccountInvestmentSubtype;

export const readableAccountSubType = (subtype: TAccountSubtype): string => {
  switch (subtype) {
    case EAccountDepositorySubtype.CHECKING:
      return "Checking";
    case EAccountDepositorySubtype.MONEY_MARKET:
      return "Money Market";
    case EAccountDepositorySubtype.SAVINGS:
      return "Savings";
    case EAccountDepositorySubtype.PAYPAL:
      return "PayPal";
    case EAccountDepositorySubtype.CASH_MANAGEMENT:
      return "Cash Management";
    case EAccountDepositorySubtype.CD:
      return "CD";
    case EAccountDepositorySubtype.EBT:
      return "EBT";
    case EAccountDepositorySubtype.HSA:
      return "HSA";
    case EAccountDepositorySubtype.PREPAID:
      return "Prepaid";

    case EAccountCreditSubtype.PAYPAL:
      return "PayPal";
    case EAccountCreditSubtype.CREDIT_CARD:
      return "Credit Card";

    case EAccountLoanSubtype.AUTO:
      return "Auto";
    case EAccountLoanSubtype.BUSINESS:
      return "Business";
    case EAccountLoanSubtype.COMMERCIAL:
      return "Commercial";
    case EAccountLoanSubtype.CONSUMER:
      return "Consumer";
    case EAccountLoanSubtype.HOME_EQUITY:
      return "Home Equity";
    case EAccountLoanSubtype.LINE_OF_CREDIT:
      return "Line of Credit";
    case EAccountLoanSubtype.LOAN:
      return "Loan";
    case EAccountLoanSubtype.MORTGAGE:
      return "Mortgage";
    case EAccountLoanSubtype.OTHER:
      return "Other";
    case EAccountLoanSubtype.OVERDRAFT:
      return "Overdraft";
    case EAccountLoanSubtype.STUDENT:
      return "Student";

    case EAccountInvestmentSubtype.BROKERAGE:
      return "Brokerage";
    case EAccountInvestmentSubtype.FOUR01k:
      return "401K";
    case EAccountInvestmentSubtype.HSA:
      return "HSA";
    case EAccountInvestmentSubtype.IRA:
      return "IRA";
    case EAccountInvestmentSubtype.MUTUAL_FUND:
      return "Mutual Fund";
    case EAccountInvestmentSubtype.NONTAXABLE_BROKERAGE_ACCOUNT:
      return "Non-Taxable Brokerage";
    case EAccountInvestmentSubtype.RETIREMENT:
      return "Retirement";
    case EAccountInvestmentSubtype.ROTH:
      return "Roth";
    case EAccountInvestmentSubtype.ROTH_401K:
      return "Roth 401K";
    case EAccountInvestmentSubtype.SIMPLE_IRA:
      return "Simple IRA";
    case EAccountInvestmentSubtype.TRUST:
      return "Trust";
    default:
      return subtype;
  }
}
