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

  constructor(
    private alertService: AlertService,
    private location: Location,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {}

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
    alert("Not implemented yet.");
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
