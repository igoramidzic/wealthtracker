import { Injectable } from '@angular/core';
import { IAccount } from '../../models/account';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { IItem } from '../../models/item';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accounts: IAccount[];

  constructor(private http: HttpClient) { }

  async addItem(public_token: string): Promise<IItem> {
    return this.http.post<IItem>(`${environment.wealthtracker_api_url}/item`, { public_token }).toPromise();
  }

  async getItems(): Promise<IItem[]> {
    return this.http.get<{ items: IItem[] }>(`${environment.wealthtracker_api_url}/items`).pipe(map(res => res.items)).toPromise();
  }
}
