import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './components/registration/registration.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { AboutComponent } from './components/about/about.component';
import { BlackWhiteComponent } from './components/black-white/black-white.component';
import { OsdSplashComponent } from './components/splash/osd-splash.component';
import { ThankkyouComponent } from './components/thankkyou/thankkyou.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: OsdSplashComponent },
  { path: 'register/:code', component: RegistrationComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'personal-info', component: PersonalInformationComponent},
  { path: 'blackwhite', component: BlackWhiteComponent},
  { path: 'about', component: AboutComponent},
  {path: 'thankyou', component: ThankkyouComponent},
  {path: '**', component: OsdSplashComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
