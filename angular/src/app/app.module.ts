import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from '@app/app.component';
import { AppRouterModule } from '@app/app.routing';

import { JwtInterceptor, ErrorInterceptor } from '@helpers';
import { MatModule } from '@modules';
import { FlexLayoutModule } from '@angular/flex-layout';

import { GUARDS, COMPONENTS, SERVICES, VIEWS, MODULES, ENTRY_COMPONENTS } from './app.declarations';

@NgModule({
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRouterModule,
      ...MODULES,
      FormsModule,
      FlexLayoutModule
  ],
  declarations: [
    AppComponent,
    ...COMPONENTS,
    ...VIEWS,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ],
  providers: [
    ...SERVICES,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
