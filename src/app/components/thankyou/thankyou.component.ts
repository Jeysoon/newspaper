import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConfirmedRegistration } from '../registration/models/confirmed-registration.model';
import { GlobalDataStore } from 'src/app/shared/store/global-data.store';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent extends GlobalDataStore<ConfirmedRegistration> implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) {
    super({ server: 'osd', endpoint: ['registrations', 'code'] })
  }

  ngOnInit() {

   const code = this.route.snapshot.paramMap.get('code');

   if(code) {
    console.log(code)
    this.params = [code]
    this.updateRecord({ id: 0, confirmed: false })
   }
  }

}


