import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { Contact } from "@app/_models";
import { ContactService, AlertService } from "@app/_services";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})

export class ContactFormComponent implements OnInit {
  @Input()
  contact: Contact;
  
  constructor(
  	private alertService: AlertService,
  	private contactService: ContactService,
  	private location: Location,
  	private router: Router
  ) {}

  ngOnInit() {}
  
  goBack() {
  	this.location.back();
  }
  
  save() {
    
  	this.contactService.addContact(this.contact).subscribe(
  	  data => {
        this.alertService.success("Contact created!", true);
        this.router.navigate(["/contacts"]);
      },
      error => {
        this.alertService.error("Unable to create contact.");
      }
  	);
  }
}
