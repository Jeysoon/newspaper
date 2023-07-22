import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';

import { GlobalDataStore } from 'src/app/shared/store/global-data.store';
import { RegistrationInfo } from './models/registration.model';
import { RegistrationSelectorsService } from './services/registration-selectors.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent extends GlobalDataStore<RegistrationInfo> implements OnInit {

  genders$ = this.registrationSelectorsService.genders()
  heard$ = this.registrationSelectorsService.whereHeard()
  ageGroups$ = this.registrationSelectorsService.ageGroups()

  matcher = new MyErrorStateMatcher();

  get isValid() {
    return (this.registrationForm.valid)
  }

  registrationForm = this.fb.group({
    firstName: ['', {validators: [Validators.required]}],
    lastName: ['', {validators: [Validators.required]}],
    email: ['', { validators: [Validators.email, Validators.required], updateOn: 'blur' }],
    ageGroup: [0, { validators: [Validators.required]}],
    gender: [0, { validators: [Validators.required]}],
    heard: [0, { validators: [Validators.required]}],
    ageAppropriate: [null, Validators.requiredTrue],
    code: ['', Validators.minLength(8)],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private registrationSelectorsService: RegistrationSelectorsService
  ) {
    super({ server: 'osd', endpoint: ['registrations'] })
  }

  ngOnInit() {
   const code = this.route.snapshot.paramMap.get('code');
   if(code) this.registrationForm.patchValue({ code })
  }

  onSubmit(){

    if(!this.registrationForm.valid) return

    const data = RegistrationInfo.adapt(this.registrationForm.value)
    console.log('DATA:', data);

    this.params = [data.code_id]
    this.addRecord(data)

    this.router.navigate(['thankyou'])
  }

}
