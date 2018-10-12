import { Component, OnInit } from '@angular/core';

import { Contact } from '@app/_models';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent implements OnInit {
  contact: Contact;

  constructor() { }

  ngOnInit() {
  	this.createContact();
  }
  
  createContact() {
  	const userId = JSON.parse(localStorage.getItem("currentUser")).id;
  	this.contact = new Contact(userId);
  }

}
