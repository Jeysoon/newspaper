import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { AboutComponent } from './components/about/about.component';
import { BlackWhiteComponent } from './components/black-white/black-white.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegistrationComponent },
  { path: 'register/:code', component: RegistrationComponent },
  { path: 'personal-info', component: PersonalInformationComponent},
  { path: 'blackwhite', component: BlackWhiteComponent},
  { path: 'about', component: AboutComponent},
  {path: '**', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
