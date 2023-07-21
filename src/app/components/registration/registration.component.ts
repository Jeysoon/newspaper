import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import {ErrorStateMatcher} from '@angular/material/core';

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
export class RegistrationComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  // FORM
  registrationForm = this.fb.group({
    firstName: ['', {validators: [Validators.required]}],
    lastName: ['', {validators: [Validators.required]}],
    email: ['', { validators: [Validators.email, Validators.required], updateOn: 'blur' }],
    ageGroup: ['', { validators: [Validators.required]}],
    gender: ['', { validators: [Validators.required]}],
    ageAppropriate: ['', Validators.required],
    code: [''],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {}

  ngOnInit() {

  this.registrationForm.valueChanges.subscribe(data => console.log(data))

   this.appService.currentRoute.next(this.router.url)
   const codeParam = this.route.snapshot.paramMap.get('code');

   if (codeParam) {
    const codeFormControl = this.registrationForm.get('code');
    if (codeFormControl) codeFormControl.setValue(codeParam);
   }

  }

  onSubmit(){
    console.log('form value', this.registrationForm.value);
    this.router.navigate(['thankyou'])
  }
}
