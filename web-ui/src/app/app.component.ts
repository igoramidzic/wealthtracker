import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService]
})
export class AppComponent {

  constructor(private messageService: MessageService) {
  }

  onPress(): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

  }
}
