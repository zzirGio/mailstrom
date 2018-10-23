import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  	private alertService: AlertService,
    private contactService: ContactService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {}
  
  edit() {
   this.router.navigate([`/edit-contact/${this.contact.id}`]);
  }
  
  delete() {
	this.contactService.deleteContact(this.contact.id).subscribe(
  		data => {
  			this.alertService.success("Contact deleted.", true);
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
