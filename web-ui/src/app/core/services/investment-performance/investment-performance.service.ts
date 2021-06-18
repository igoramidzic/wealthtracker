import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvestmentPerformanceService {

  private _annualReturns: number;
  get annualReturn(): number { return this._annualReturns; }

  constructor() {
    this._annualReturns = 0.08;
  }

  updateAnnualReturns(annualReturns: number): void {
    this._annualReturns = annualReturns;
  }
}
