import { Component, OnInit } from '@angular/core';

import { MessageService } from '@services';
import { Message } from '@models';

@Component({
  selector: 'app-upcoming-messages-widget',
  templateUrl: './upcoming-messages-widget.component.html',
  styleUrls: ['./upcoming-messages-widget.component.scss']
})
export class UpcomingMessagesWidgetComponent implements OnInit {

  messages: Message[] = [];
  currentUsername: string;

  constructor(
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.currentUsername = currentUser.username;
    this.getMessages();
  }

  getMessages() {
    this.messageService.getMessagesByUsername(this.currentUsername).subscribe(
      data => {
        this.messages = data.filter(m => !m.isSent);
        this.messages.sort((a: Message, b: Message) => {
          return new Date(a.timeToBeSent).getTime() - new Date(b.timeToBeSent).getTime();
        });
        this.messages = this.messages.slice(0, 3);
      },
      error => {
      }
    );
  }
}
