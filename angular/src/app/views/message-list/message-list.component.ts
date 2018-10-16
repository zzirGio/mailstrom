import { Component, OnInit } from "@angular/core";

import { Message } from "@models";
import { AlertService, MessageService } from "@app/_services";

@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.scss"]
})
export class MessageListComponent implements OnInit {
  isLoading: boolean = true;
  messages: Message[];
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
    this.messageService.getMessagesByUsername(this.currentUsername).subscribe(
      data => {
        this.messages = data
          .filter(d => !d.isSent)
          .sort(
            (a, b) =>
              new Date(a.timeToBeSent).getTime() -
              new Date(b.timeToBeSent).getTime()
          );
        this.isLoading = false;
      },
      error => {
        this.alertService.error("Unable to load messages.");
        this.isLoading = false;
      }
    );
  }
}
