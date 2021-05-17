import { Component, Input, OnInit } from '@angular/core';
import { IItem } from 'src/app/core/models/item';

@Component({
  selector: 'app-account-item-list',
  templateUrl: './account-item-list.component.html',
  styleUrls: ['./account-item-list.component.scss']
})
export class AccountItemListComponent implements OnInit {

  @Input() items: IItem[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.items)
  }

  get sortedItems(): IItem[] {
    return this.items.sort((a, b) => a.institution.name > b.institution.name ? 1 : -1);
  }
}
