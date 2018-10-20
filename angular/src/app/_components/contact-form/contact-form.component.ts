import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Input()
  isEditing: boolean;
  @Input()
  heading: string;
  
  contactForm: FormGroup;
  submitted: boolean = false;
  
  constructor(
  	private alertService: AlertService,
  	private contactService: ContactService,
  	private formBuilder: FormBuilder,
  	private location: Location,
  	private router: Router
  ) {}

  ngOnInit() {
  	this.contactForm = this.formBuilder.group({
  		name: ['', Validators.required],
  		phoneNumber: ['', [ Validators.required, Validators.pattern('^04[0-9]{8}$') ]]
  	});
  }
  
  get f() { return this.contactForm.controls; }
  
  goBack() {
  	this.location.back();
  }
  
  save() {
  	if (this.isEditing) {
  	  this.update();
  	} else {
  	  this.create();
  	}
  }
  
  create() {  
  	  this.submitted = true;

  	  if (this.contactForm.invalid) {
	  	  return;
      }
      
      this.contact.name = this.contactForm.value.name;
      this.contact.phoneNumber = this.contactForm.value.phoneNumber;
      
  	  this.contactService.addContact(this.contact).subscribe(
  	    data => {
          this.alertService.success("Contact created!", true);
          this.router.navigate(["/contacts"]);
        },
        error => {
       	  if (error === "Phone number wrong format.") {
       	  	this.alertService.error("Please enter a valid Australian phone number.");
       	  } else if (error === "Name field empty.") {
       	  	this.alertService.error("Name cannot be empty.");
       	  } else {
          	this.alertService.error("Unable to create contact.");
       	  }
        }
  	  );
  }
  
  update() {
  	  this.contactService.updateContact(this.contact).subscribe(
  	    data => {
  	      this.alertService.success("Contact update!", true);
  	      this.router.navigate(["/contacts"]);
  	    },
  	    error => {
  	      this.alertService.error("Unable to update contact.");
  	    }
  	  );
  	}
}
