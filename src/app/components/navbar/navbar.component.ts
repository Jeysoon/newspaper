import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  date!: Date;

  ngOnInit() {
    this.date = new Date();
//     const date = new Date();
// const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
// const formattedDate = date.toLocaleString('en-US', options);
  }
  onNavigate(){

  }

}
