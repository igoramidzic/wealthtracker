import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, take, tap } from 'rxjs/operators';
import { EItemStatus, IItem } from '../../models/item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  items: IItem[];
  items$: Subject<IItem[]>;
  refreshingAccounts: boolean;
  refreshingAccounts$: Subject<boolean>;

  constructor(private http: HttpClient) {
    this.items$ = new Subject();
    this.refreshingAccounts$ = new Subject();
    this.items$.pipe(take(1)).subscribe(() => {
      this.refreshAccounts();
    })
  }

  refreshAccounts(): void {
    this.refreshingAccounts = true;
    this.refreshingAccounts$.next(true);

    let promiseList: Promise<IItem>[] = [];

    this.items.forEach(item => {
      this.setItemStatus(item, EItemStatus.REFRESHING);

      let promise = new Promise<IItem | null>((resolve, reject) => {
        this.http.post<IItem>(environment.wealthtracker_api_url + '/item/balances/get', { itemId: item.itemId })
          .subscribe(item => {
            let itemIndex = this.items.findIndex(item2 => item2.itemId == item.itemId);
            this.setItemStatus(item, EItemStatus.IDLE)
            this.items[itemIndex] = item;
            this.items$.next(this.items);
            resolve(item);
          }, err => {
            this.setItemStatus(item, EItemStatus.FAILED_REFRESHING);
            resolve(null);
          })
      })

      promiseList.push(promise);
    });

    Promise.all(promiseList)
      .then(() => { })
      .catch(() => { })
      .finally(() => {
        this.refreshingAccounts = false;
        this.refreshingAccounts$.next(this.refreshingAccounts);
      })
  }

  private setItemStatus(item: IItem, status: EItemStatus): void {
    item.status = status;
    item.accounts.forEach(account => account.status = status);
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
          this.items.forEach(item => this.setItemStatus(item, EItemStatus.IDLE));
          this.items$.next(this.items);
        })
      ).toPromise();
  }

  get allowRefresh(): boolean {
    return !this.refreshingAccounts && !!this.items && this.items.length > 0;
  }

  getInvestmentBalance(): number {
    return 0;
  }
}
