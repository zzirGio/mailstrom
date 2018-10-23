import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { MatSnackBar } from "@angular/material";
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
  isWaitingOnDatabase: boolean = false;

  constructor(
    private alertService: AlertService,
    private contactService: ContactService,
    private location: Location,
    private messageService: MessageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")).id;
    this.contactService.getContactsList(currentUser).subscribe(
      data => {
        if (data.length == 0) {
          this.alertService.error(
            "You have no contacts. Get started by creating a contact."
          );
          this.isWaitingOnDatabase = true;
        }
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
    this.isWaitingOnDatabase = true;
    if (this.isUpdatingExistingMessage) {
      this.updateExistingMessage();
    } else {
      this.createNewMessage();
    }
  }

  createNewMessage() {
    this.messageService.addMessage(this.message).subscribe(
      data => {
        this.snackBar.open("Message created!", "Dismiss", { duration: 3000 });
        this.router.navigate(["/messages"]);
      },
      error => {
        this.alertService.error(error);
        this.isWaitingOnDatabase = false;
      }
    );
  }

  updateExistingMessage() {
    this.messageService.updateMessage(this.message).subscribe(
      data => {
        this.snackBar.open("Message updated.", "Dismiss", { duration: 3000 });
        this.router.navigate(["/messages"]);
      },
      error => {
        this.alertService.error(error);
        this.isWaitingOnDatabase = false;
      }
    );
  }
}
