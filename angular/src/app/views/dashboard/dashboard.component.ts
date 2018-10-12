import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@models';
import { UserService } from '@services';

import { content } from '@app/app.content';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pageContent = content.views.dashboard;
  glyphicons = content.views.dashboard.glyphicons;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  // TODO: update these links

  goToCreate() {
    this.router.navigate(['/create-message']);
  }

  goToScheduledMessages() {
    this.router.navigate(['/messages']);
  }
  
  goToContacts() {
  	this.router.navigate(['/create-contact']);
  }

  goToTemplates() {
    alert('Going to Templates! But it is not implemented yet');
    // this.router.navigate['/**'];
  }

  goToManageProfile() {
    this.router.navigate(['/user-management']);
  }
}
