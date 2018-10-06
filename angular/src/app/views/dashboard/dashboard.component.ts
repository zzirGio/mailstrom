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

  goToTemplates() {
    this.router.navigate(['/template-management']);
  }

  goToManageProfile() {
    this.router.navigate(['/user-management']);
  }

  goToContacts() {
    alert('Going to Contacts! But it is not implemented yet');
    // this.router.navigate['/**'];
  }
}
