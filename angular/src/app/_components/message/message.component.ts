import { Component, OnInit, Input } from "@angular/core";
import { MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";

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
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  edit() {
    this.router.navigate([`/edit-message/${this.message.id}`]);
  }

  delete() {
    this.messageService.deleteMessageById(this.message.id).subscribe(
      data => {
        this.snackBar.open("Message deleted.", 'Dismiss', { duration: 3000 });
        this.show = false;
      },
      error => {
        this.alertService.error("Unable to delete message.");
      }
    );
  }
}
