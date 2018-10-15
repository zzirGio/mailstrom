import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Contact } from '@models';
import { AlertService, ContactService } from '@app/_services';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private alertService : AlertService,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.getContact();
  }
  
  getContact() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.contactService.getContactById(id).subscribe(
      contact => {
        this.contact = contact;
      },
      error => {
        this.alertService.error("Unable to get contact for update.");
      }
    );
  }

}
