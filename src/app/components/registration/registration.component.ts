import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router, private appService: AppService) {}

  ngOnInit() {
   this.appService.currentRoute.next(this.router.url)
  }

  registrationForm = this.fb.group({
    firstname: ['', {validators: [Validators.required]}],
    lastname: ['', {validators: [Validators.required]}],
    email: ['', { validators: [Validators.email, Validators.required], updateOn: 'blur' }],
    code: [''],
  });
  onSubmit(){
    console.log('form value', this.registrationForm.value);
  }
}
