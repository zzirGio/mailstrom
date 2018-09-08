import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from '@helpers';

// TODO: move this to views
import { ScheduledMessagesComponent } from './scheduled-messages/scheduled-messages.component';

import {GUARDS, COMPONENTS, SERVICES, VIEWS } from './app.declarations';
import { DashboardComponent } from './views/dashboard/dashboard.component';

@NgModule({
  imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      routing
  ],
  declarations: [
    AppComponent,
    ...COMPONENTS,
    ...VIEWS,
    ScheduledMessagesComponent,
    DashboardComponent // TODO: move this to declarations.ts
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
