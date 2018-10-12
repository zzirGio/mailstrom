import { Component, OnInit } from '@angular/core';

import { Contact } from '@models';
import { ContactService, AlertService } from '@app/_services';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];

  constructor(
    private contactService: ContactService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
  	const currentUser = JSON.parse(localStorage.getItem("currentUser")).id;
  	
  	this.contactService.getContactsList(currentUser).subscribe(
  	  data => {
  	    this.contacts = data;
  	  },
  	  error => {
  	    this.alertService.error("Unable to load contacts list.");
  	  }
  	);
  }

}
