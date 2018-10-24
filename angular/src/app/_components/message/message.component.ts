import { Component, OnInit, Input } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

import { DeleteMessageDialogContentComponent } from "../dialog/dialog-content.component";
import { Message } from "@models";
import { AlertService, MessageService } from "@services";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"]
})
export class MessageComponent implements OnInit {
  @Input()
  message: Message;
  messageDeleted: boolean = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  editButtonClicked() {
    this.router.navigate([`/edit-message/${this.message.id}`]);
  }

  deleteButtonClicked() {
    const dialogRef = this.dialog.open(DeleteMessageDialogContentComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._deleteMessage();
      }
    });
  }

  _deleteMessage() {
    this.messageService.deleteMessageById(this.message.id).subscribe(
      data => {
        this.snackBar.open("Message deleted.", "Dismiss", { duration: 3000 });
        this.messageDeleted = true;
      },
      error => {
        this.alertService.error("Unable to delete message.");
      }
    );
  }
}
