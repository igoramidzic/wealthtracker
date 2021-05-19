import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { IItem } from '../../models/item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  items: IItem[];
  items$: Subject<IItem[]>;

  constructor(private http: HttpClient) {
    this.items$ = new Subject();
  }

  async addItem(public_token: string): Promise<IItem> {
    return this.http.post<IItem>(environment.wealthtracker_api_url + '/item', { public_token })
      .pipe(
        tap(item => {
          this.items.push(item);
          this.items$.next(this.items);
        })
      ).toPromise();
  }

  async deleteItem(itemId: string): Promise<IItem> {
    return this.http.request<IItem>('delete', environment.wealthtracker_api_url + '/item', { body: { itemId } })
      .pipe(
        tap(item => {
          this.items = this.items.filter(item => item.itemId != itemId);
          this.items$.next(this.items);
        })
      ).toPromise();
  }

  async getItems(): Promise<IItem[]> {
    return this.http.get<{ items: IItem[] }>(environment.wealthtracker_api_url + '/items').pipe(map(res => res.items))
      .pipe(
        tap(items => {
          this.items = items;
          this.items$.next(this.items);
        })
      ).toPromise();
  }
}
