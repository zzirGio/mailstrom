import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { Message } from "@app/_models";
import { MessageService, AlertService } from "@app/_services";

@Component({
  selector: "app-message-form",
  templateUrl: "./message-form.component.html",
  styleUrls: ["./message-form.component.scss"]
})
export class MessageFormComponent implements OnInit {
  @Input()
  isUpdatingExistingMessage = false;
  @Input()
  message: Message;
  @Input()
  formHeading: string;
  minScheduleDate: Date = new Date();

  constructor(
    private alertService: AlertService,
    private location: Location,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {}

  public set timeToSend(v: string) {
    let actualParsedDate = v ? new Date(v) : new Date();
    let normalizedParsedDate = new Date(
      actualParsedDate.getTime() + actualParsedDate.getTimezoneOffset() * 60000
    );
    this.message.timeToBeSent = normalizedParsedDate;
  }

  goBack() {
    this.location.back();
  }

  save() {
    if (this.isUpdatingExistingMessage) {
      this.updateExistingMessage();
    } else {
      this.createNewMessage();
    }
  }

  createNewMessage() {
    this.messageService.addMessage(this.message).subscribe(
      data => {
        this.alertService.success("Message created!", true);
        this.router.navigate(["/messages"]);
      },
      error => {
        console.log(error);
        this.alertService.error("Unable to create message");
      }
    );
  }

  updateExistingMessage() {
    this.messageService.updateMessage(this.message).subscribe(
      data => {
        this.alertService.success("Message updated.", true);
        this.router.navigate(["/messages"]);
      },
      error => {
        this.alertService.error("Unable to update message");
      }
    );
  }
}
