import { Component, OnInit } from '@angular/core';

import { MessageService } from '@services';
import { Message, User } from '@models';

@Component({
  selector: 'app-recent-messages-widget',
  templateUrl: './recent-messages-widget.component.html',
  styleUrls: ['./recent-messages-widget.component.scss']
})
export class RecentMessagesWidgetComponent implements OnInit {

  messages: Message[] = [];
  userId: number;

  constructor(
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    const currentUser = <User>JSON.parse(localStorage.getItem("currentUser"));
    this.userId = currentUser.id;
    this.getMessages();
  }

  getMessages() {
    this.messageService.getMessagesById(this.userId).subscribe(
      data => {
        this.messages = data.filter(m => m.isSent);
        this.messages.sort((a: Message, b: Message) => {
          return new Date(b.timeToBeSent).getTime() - new Date(a.timeToBeSent).getTime();
        });
        this.messages = this.messages.slice(0, 3);
      },
      error => {
      }
    );
  }
}


