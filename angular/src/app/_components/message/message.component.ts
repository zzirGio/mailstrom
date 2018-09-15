import { Component, OnInit, Input } from "@angular/core";

import { Message } from "@models";
import { AlertService, MessageService } from "@app/_services";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"]
})
export class MessageComponent implements OnInit {
  @Input()
  message: Message;
  show: boolean = true;

  constructor(
    private alertService: AlertService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  edit() {
    alert("Not implemented yet.");
  }

  delete() {
    this.messageService.deleteMessageById(this.message.id).subscribe(
      data => {
        this.alertService.success("Message deleted.");
        this.show = false;
      },
      error => {
        this.alertService.error("Unable to delete message.");
      }
    );
  }
}
