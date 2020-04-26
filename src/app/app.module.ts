import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';

import { AppRoutingModule } from './app-routing.module';

// MODULE
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// COMPONENT
import { AppComponent } from './app.component';

// COMPONENT - TEMPLATE PUBLIC
import { PageComponent as PublicPageComponent } from '@templates/public/container/page/page.component';
import { NavbarComponent as PublicNavbarComponent } from '@templates/public/navbar/navbar.component';

registerLocaleData(localeId);

@NgModule({
  declarations: [
    AppComponent,
    PublicPageComponent,
    PublicNavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutingModule, {
      scrollPositionRestoration: 'top'
    }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
