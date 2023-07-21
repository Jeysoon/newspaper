import { Component, OnInit } from '@angular/core';
import { GlobalDataStore } from './shared/store/global-data.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends GlobalDataStore<any> implements OnInit {

  constructor() {
    super({ server: 'osd', endpoint: ['healthcheck'] })
  }

  ngOnInit() {
    this.params = []
    this.fetchRecords()
  }

}
