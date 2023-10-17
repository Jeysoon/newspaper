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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

import { SnackbarErrorModule } from './shared/snackbar-error/snackbar-error.module';
import { ErrorType } from './shared/snackbar-error/models/error-type.enum';
import { PrivacyComponent } from './components/privacy/privacy.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavbarComponent,
    PersonalInformationComponent,
    OsdSplashComponent,
    OsdEntryFormComponent,
    OsdMessageComponent,
    PrivacyComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    SnackbarErrorModule.forRoot({
      verticalPosition: 'top',
      horizontalPosition: 'center',
      autoDismiss: false,
      duration: 3 * 1000,
      type: ErrorType.NONE
    }),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
