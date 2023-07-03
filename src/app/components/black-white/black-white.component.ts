import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-black-white',
  templateUrl: './black-white.component.html',
  styleUrls: ['./black-white.component.css']
})
export class BlackWhiteComponent implements OnInit {

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) {}

  ngOnInit() {
  console.log('setting route in black and white to:', this.router.url);
  this.appService.currentRoute.next(this.router.url);
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
