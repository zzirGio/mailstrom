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
  filteredContacts: Contact[];
  
  private _searchTerm: string;
  get searchTerm(): string {
  	return this._searchTerm;
  }
  set searchTerm(term: string) {
  	this._searchTerm = term;
  	this.filteredContacts = this.filterContactByName(term);
  }
  
  constructor(
    private contactService: ContactService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
  	const currentUser = JSON.parse(localStorage.getItem("currentUser")).id;
  	
  	this.contactService.getContactsList(currentUser).subscribe(
  	  data => {
  	    this.contacts = data;
  	    this.filteredContacts = data.sort((a, b) => {
  	    	if (a.name < b.name) {
  	    		return -1;
  	    	} else if ( a.name > b.name) {
  	    		return 1;
  	    	} else {
  	    		return 0;
  	    	}
  	    });
  	  },
  	  error => {
  	    this.alertService.error("Unable to load contacts list.");
  	  }
  	);
  }
  
  filterContactByName(searchString: string) {
  	return this.contacts.filter(contact => contact.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
}
