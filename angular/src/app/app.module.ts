import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '@app/app.component';
import { AppRouterModule } from '@app/app.routing';

import { JwtInterceptor, ErrorInterceptor } from '@helpers';
import { MatModule } from '@modules';

import { GUARDS, COMPONENTS, SERVICES, VIEWS } from './app.declarations';

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
    ...VIEWS
  ],
  providers: [
    ...SERVICES,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
