import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Contact } from '@models';
import { AlertService, ContactService } from '@app/_services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  @Input()
  contact: Contact;

  constructor(
  	private alertService: AlertService,
    private contactService: ContactService,
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
   	  this.alertService.error("Unable to delete contact.");
   	}
   );
  }

}
