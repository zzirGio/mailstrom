import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from "@angular/material";
import { Router } from '@angular/router';

import { DeleteContactDialogContentComponent } from "@components";
import { Contact, Message } from '@models';
import { AlertService, ContactService, MessageService } from '@app/_services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  @Input()
  contact: Contact;
  messages: Message[];

  constructor(
  	private dialog: MatDialog,
  	private alertService: AlertService,
    private contactService: ContactService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {}
  
  edit() {
   this.router.navigate([`/edit-contact/${this.contact.id}`]);
  }
  
  deleteButtonClicked() {
    const dialogRef = this.dialog.open(DeleteContactDialogContentComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._delete();
      }
    });
  }
  
  _delete() {
	this.contactService.deleteContact(this.contact.id).subscribe(
  		data => {
  			this.snackBar.open("Contact deleted.", "Dismiss", { duration: 3000 });
  			location.reload(true);
		},
		error => {
			if (error === "Contact cannot be deleted due to scheduled messages.") {
				this.alertService.error(error);
			} else {
				this.alertService.error("Unable to delete contact.");
			}
		}
	);
  }
}
