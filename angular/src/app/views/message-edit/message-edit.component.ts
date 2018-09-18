import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

import { Message } from "@app/_models";
import { MessageService, AlertService } from "@app/_services";

@Component({
  selector: "app-message-edit",
  templateUrl: "./message-edit.component.html",
  styleUrls: ["./message-edit.component.scss"]
})
export class MessageEditComponent implements OnInit {
  message: Message;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getMessage();
  }

  getMessage() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.messageService.getById(id).subscribe(
      message => {
        this.message = message;
        this.isLoading = false;
      },
      error => {
        this.alertService.error("Unable to load message.");
        this.isLoading = false;
      }
    );
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.messageService.updateMessage(this.message).subscribe(
      data => {
        this.alertService.success("Message updated.", true);
        this.location.back();
      },
      error => {
        this.alertService.error("Unable to update message");
      }
    );
  }
}
