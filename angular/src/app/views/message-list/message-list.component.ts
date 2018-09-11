import { Component, OnInit } from "@angular/core";

import { Message } from "@models";
import { AlertService, MessageService } from "@app/_services";

@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.scss"]
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  currentUsername: string;

  constructor(
    private messageService: MessageService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.currentUsername = currentUser.username;
    this.getMessages();
  }

  getMessages() {
    this.messageService.getMessagesByUsername("jono").subscribe(
      data => {
        this.messages = data;
      },
      error => {
        this.alertService.error("Unable to load messages.");
      }
    );
  }
}
