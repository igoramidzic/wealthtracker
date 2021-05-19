import { EAccountDepositorySubtype, EAccountCreditSubtype, EAccountInvestmentSubtype } from '../models/account';

export const Checking_Cash_Subtypes = [
  EAccountDepositorySubtype.CHECKING,
  EAccountDepositorySubtype.CASH_MANAGEMENT,
  EAccountDepositorySubtype.CD,
  EAccountDepositorySubtype.EBT,
  EAccountDepositorySubtype.MONEY_MARKET,
  EAccountDepositorySubtype.PAYPAL,
  EAccountDepositorySubtype.CASH_MANAGEMENT,
  EAccountDepositorySubtype.PREPAID,
];

export const Savings_Subtypes = [
  EAccountDepositorySubtype.SAVINGS,
  EAccountDepositorySubtype.HSA
];

export const Credit_Subtypes = [
  EAccountCreditSubtype.CREDIT_CARD,
  EAccountCreditSubtype.PAYPAL
]

export const Investment_Retirement_Account_Subtypes = [
  EAccountInvestmentSubtype.FOUR01a,
  EAccountInvestmentSubtype.FOUR01k,
  EAccountInvestmentSubtype.FOUR03b,
  EAccountInvestmentSubtype.FOUR57b,
  EAccountInvestmentSubtype.IRA,
  EAccountInvestmentSubtype.RETIREMENT,
  EAccountInvestmentSubtype.ROTH,
  EAccountInvestmentSubtype.ROTH_401K,
  EAccountInvestmentSubtype.SIMPLE_IRA,
]

export const Investment_Brokerage_Account_Subtypes = [
  EAccountInvestmentSubtype.BROKERAGE,
  EAccountInvestmentSubtype.NONTAXABLE_BROKERAGE_ACCOUNT,
]

export const Investment_Other_Subtypes = [
  EAccountInvestmentSubtype.FIVE29,
  EAccountInvestmentSubtype.CASHISA,
  EAccountInvestmentSubtype.EDUCATION_SAVINGS_ACCOUNT,
  EAccountInvestmentSubtype.FIXED_ANNUITY,
  EAccountInvestmentSubtype.GIC,
  EAccountInvestmentSubtype.HEALTH_REIMBURSEMENT_ARRANGEMENT,
  EAccountInvestmentSubtype.HSA,
  EAccountInvestmentSubtype.ISA,
  EAccountInvestmentSubtype.KEOGH,
  EAccountInvestmentSubtype.LIF,
  EAccountInvestmentSubtype.LIRA,
  EAccountInvestmentSubtype.LRIF,
  EAccountInvestmentSubtype.LRSP,
  EAccountInvestmentSubtype.MUTUAL_FUND,
  EAccountInvestmentSubtype.PENSION,
  EAccountInvestmentSubtype.PRIF,
  EAccountInvestmentSubtype.PROFIT_SHARING_PLAN,
  EAccountInvestmentSubtype.QSHR,
  EAccountInvestmentSubtype.RDSP,
  EAccountInvestmentSubtype.RESP,
  EAccountInvestmentSubtype.RLIF,
  EAccountInvestmentSubtype.RRIF,
  EAccountInvestmentSubtype.RRSP,
  EAccountInvestmentSubtype.SARSEP,
  EAccountInvestmentSubtype.SEPIRA,
  EAccountInvestmentSubtype.SIPP,
  EAccountInvestmentSubtype.STOCK_PLAN,
  EAccountInvestmentSubtype.TFSA,
  EAccountInvestmentSubtype.TRUST,
  EAccountInvestmentSubtype.UGMA,
  EAccountInvestmentSubtype.UTMA,
  EAccountInvestmentSubtype.VARIABLE_ANNUITY,
]

export const Investment_Subtypes = Investment_Brokerage_Account_Subtypes
  .concat(Investment_Retirement_Account_Subtypes)
  .concat(Investment_Brokerage_Account_Subtypes)
