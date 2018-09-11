import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { content } from '@app/app.content';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  pageContent = content.views.landing;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getStarted() {
    this.router.navigate(['/login']);
  }

}
