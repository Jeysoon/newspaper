import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  registrationForm = this.fb.group({
    email: ['', { validators: [Validators.email, Validators.required], updateOn: 'blur' }],
    code: [''],
  });
  onSubmit(){
    console.log('form value', this.registrationForm.value);
  }
}
