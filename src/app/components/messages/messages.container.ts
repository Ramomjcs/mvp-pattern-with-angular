import { Component } from '@angular/core';

import { MessageService } from '../../services/message.service';
import { MessagesComponent } from './messages.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.container.html',
  standalone: true,
  imports: [MessagesComponent],
})
export class MessagesContainerComponent {
  get messages(): string[] {
    return this.messageService.messages;
  }

  constructor(private messageService: MessageService) {}

  clearMessages(): void {
    this.messageService.clear();
  }
}