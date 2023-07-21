import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './components/registration/registration.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { OsdSplashComponent } from './components/splash/osd-splash.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: OsdSplashComponent },
  { path: 'register/:code', component: RegistrationComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'personal-info', component: PersonalInformationComponent},
  {path: 'thankyou', component: ThankyouComponent},
  {path: '**', component: OsdSplashComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
