import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-black-white',
  templateUrl: './black-white.component.html',
  styleUrls: ['./black-white.component.css']
})
export class BlackWhiteComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

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
