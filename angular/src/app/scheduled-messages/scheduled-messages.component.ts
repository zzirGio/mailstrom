import { Component, OnInit } from '@angular/core';

import { Message } from '../message'

@Component({
  selector: 'app-scheduled-messages',
  templateUrl: './scheduled-messages.component.html',
  styleUrls: ['./scheduled-messages.component.scss']
})
export class ScheduledMessagesComponent implements OnInit {

  messages: Message[] = [];

  constructor() { }

  ngOnInit() {
  }

}
