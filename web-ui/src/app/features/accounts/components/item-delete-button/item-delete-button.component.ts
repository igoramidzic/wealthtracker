import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IItem } from 'src/app/core/models/item';
import { AccountsService } from '../../../../core/services/accounts/accounts.service';

@Component({
  selector: 'app-item-delete-button',
  templateUrl: './item-delete-button.component.html',
  styleUrls: ['./item-delete-button.component.scss']
})
export class ItemDeleteButtonComponent implements OnInit {

  isDeleting: boolean;
  @Input() item: IItem;

  constructor(private accountsService: AccountsService) {
    this.isDeleting = false;
  }

  ngOnInit(): void {
  }

  async onDeleteItem(): Promise<void> {
    this.isDeleting = true;
    console.log(this.item)
    try {
      let item = await this.accountsService.deleteItem(this.item.itemId);
    } catch (e) {
      console.log(e);
    }
    this.isDeleting = false;
  }
}
