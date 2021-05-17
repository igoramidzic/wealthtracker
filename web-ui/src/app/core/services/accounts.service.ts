import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IItem } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private _items: IItem[];
  get items(): IItem[] { return this._items; }

  constructor(private http: HttpClient) {
  }

  async addItem(public_token: string): Promise<IItem> {
    return this.http.post<IItem>(environment.wealthtracker_api_url + '/item', { public_token }).toPromise();
  }

  async deleteItem(itemId: string): Promise<void> {

  }

  async getItems(): Promise<IItem[]> {
    return this.http.get<{ items: IItem[] }>(environment.wealthtracker_api_url + '/items').pipe(map(res => res.items)).toPromise();
  }

}
