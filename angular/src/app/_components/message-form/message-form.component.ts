import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { Contact, Message } from "@app/_models";
import { AlertService, ContactService, MessageService } from "@app/_services";

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
  contacts: Contact[] = [];
  maxContentLength: number = 160;
  minScheduleDate: Date = new Date();

  constructor(
    private alertService: AlertService,
    private contactService: ContactService,
    private location: Location,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")).id;
  	this.contactService.getContactsList(currentUser).subscribe(
  	  data => {
  	    this.contacts = data;
  	  },
  	  error => {
  	    this.alertService.error("Unable to load contacts.");
  	  }
    );
  }

  public set timeToSend(v: string) {
    let date = v ? new Date(v) : new Date();
    this.message.timeToBeSent = date;
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
