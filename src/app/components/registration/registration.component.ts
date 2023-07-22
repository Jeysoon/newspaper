import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';

import { GlobalDataStore } from 'src/app/shared/store/global-data.store';
import { RegistrationInfo } from './models/registration.model';

import { GendersService } from './services/genders.service';
import { WhereHeardService } from './services/where-heard.service';
import { AgeGroupsService } from './services/age-groups.service';
import { concatMap, first, map, take } from 'rxjs';

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

  genders$ = this.genders.data$

  heard$ = this.whereHeard.data$.pipe(
    map(items => items.sort((a: any,b: any) => a.name.localeCompare(b.name)))
  )

  ageGroups$ = this.ageGroups.data$

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
    private genders: GendersService,
    private whereHeard: WhereHeardService,
    private ageGroups: AgeGroupsService,
  ) {
    super({ server: 'osd', endpoint: ['registrations'] })
  }

  ngOnInit() {

    this.genders.getData()
    this.whereHeard.getData()
    this.ageGroups.getData()

    const code = this.route.snapshot.paramMap.get('code');
    const codeClean = (code) ? code.substring(0, 8) : ''
    if(code) this.registrationForm.patchValue({ code: codeClean })

  }

  onSubmit(){

    if(!this.registrationForm.valid) return

    const data = RegistrationInfo.adapt(this.registrationForm.value)

    this.params = []
    this.addRecord(data)

    this.data$.pipe(
      take(1),
    ).subscribe(data => {
      this.isPending$.pipe(
        first(isPending => !isPending),
        take(1)
      ).subscribe(() => {
        this.router.navigate(['thankyou'])
      })
    })

  }

}
