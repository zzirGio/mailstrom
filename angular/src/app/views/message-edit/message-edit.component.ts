import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { Message } from "@app/_models";
import { MessageService, AlertService } from "@app/_services";

@Component({
  selector: "app-message-edit",
  templateUrl: "./message-edit.component.html",
  styleUrls: ["./message-edit.component.scss"]
})
export class MessageEditComponent implements OnInit {
  isLoading: boolean = true;
  formHeading: string = "Edit message";
  message: Message;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
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
}
