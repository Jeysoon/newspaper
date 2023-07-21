import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { OsdSplashComponent } from './components/splash/osd-splash.component';
import { OsdEntryFormComponent } from './components/osd-entry-form/osd-entry-form.component';
import { OsdMessageComponent } from './components/osd-message/osd-message.component';

import { MaterialModule } from './materials.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavbarComponent,
    PersonalInformationComponent,
    OsdSplashComponent,
    OsdEntryFormComponent,
    OsdMessageComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
