import { Component, OnInit, Input } from '@angular/core';

import { Contact } from '@models';
import { ContactService } from '@app/_services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  @Input()
  contact: Contact;

  constructor(
    contactService: ContactService
  ) { }

  ngOnInit() {}

}
