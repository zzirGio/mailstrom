import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '@app/app.component';
import { AppRouterModule } from '@app/app.routing';

import { JwtInterceptor, ErrorInterceptor } from '@helpers';
import { MatModule } from '@modules';

// TODO: move this to views
import { MessageListComponent } from './message-list/message-list.component';

import {GUARDS, COMPONENTS, SERVICES, VIEWS } from './app.declarations';
import { PageContentComponent } from './_components/page-content/page-content.component';
import { ActionContentComponent } from './_components/action-content/action-content.component';

@NgModule({
  imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRouterModule,
      MatModule
    //   FlexLayoutModule,
  ],
  declarations: [
    AppComponent,
    ...COMPONENTS,
    ...VIEWS,
    MessageListComponent,
    PageContentComponent,
    ActionContentComponent // TODO: move this to declarations.ts
  ],
  providers: [
    ...SERVICES,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
