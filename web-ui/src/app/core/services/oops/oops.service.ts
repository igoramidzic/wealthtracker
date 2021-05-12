import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OopsService {

  private _whatWentWrong: string;
  private _hasError: boolean;
  get whatWentWrong(): string { return this._whatWentWrong; }
  get hasError(): boolean { return this._hasError; }

  constructor() { }

  setWhatWentWrong(whatWentWrong: string): void {
    this._hasError = true;
    this._whatWentWrong = whatWentWrong;
  }
}
