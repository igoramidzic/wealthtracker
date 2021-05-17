import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-loading-accounts',
  templateUrl: './error-loading-accounts.component.html',
  styleUrls: ['./error-loading-accounts.component.scss']
})
export class ErrorLoadingAccountsComponent implements OnInit {

  @Output() tryAgain: EventEmitter<void>;
  constructor() {
    this.tryAgain = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onTryAgain(): void {
    this.tryAgain.emit();
  }
}
