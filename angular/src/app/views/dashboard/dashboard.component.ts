import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, Message } from '@models'
import { ContactService, MessageService } from '@services';

import { content } from '@app/app.content';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pageContent = content.views.dashboard;
  glyphicons = content.views.dashboard.glyphicons;
  messages: Message[] = [];
  recentMessages: Message[] = [];
  upcomingMessages: Message[] = [];
  stats = {
    numScheduled: -1,
    numSent: -1,
    numContacts: -1,
  };

  constructor(
    private messageService: MessageService,
    private contactService: ContactService,
    private router: Router) {
  }

  ngOnInit() {
    const currentUser = <User>JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser.id;

    this.contactService.getContactsList(userId).subscribe(
  	  data => {
        this.stats.numContacts = data.length;
      },
      error => {
        console.log(error)
      }
    );
    
    this.messageService.getMessagesById(userId).subscribe(
      data =>{
        this.messages = data;
        this.stats.numScheduled = data.length;
        this.recentMessages = this._sortMessages(this.messages, true);
        this.stats.numSent = this.recentMessages.length;
        this.upcomingMessages = this._sortMessages(this.messages, false).slice(0, 3);
        this.recentMessages = this.recentMessages.slice(0, 3);
      },
      error => {
        console.log(error)
      }
    );
  }

  // TODO: update these links

  goToCreate() {
    this.router.navigate(['/create-message']);
  }

  goToScheduledMessages() {
    this.router.navigate(['/messages']);
  }
  
  goToContacts() {
  	this.router.navigate(['/contacts']);
  }

  goToTemplates() {
    this.router.navigate(['/template-management']);
  }

  goToManageProfile() {
    this.router.navigate(['/user-management']);
  }

  private _sortMessages(messages: Message[], isRecent: boolean): Message[] {
    const result = messages.filter(m => m.isSent === isRecent);
    result.sort((a: Message, b: Message) => {
      return (new Date(b.timeToBeSent).getTime() - new Date(a.timeToBeSent).getTime()) * (isRecent? 1 : -1);
    });

    return result;
  }
}
