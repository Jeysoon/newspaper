import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalDataStore } from 'src/app/shared/store/global-data.store';
import { ConfirmedRegistration } from '../registration/models/confirmed-registration.model';
import { first, take } from 'rxjs';

@Component({
  selector: 'app-thankyou',
  templateUrl: './confirmed-thankyou.component.html',
  styleUrls: ['./confirmed-thankyou.component.css']
})
export class ConfirmedThankyouComponent extends GlobalDataStore<ConfirmedRegistration> implements OnInit {

  //URL for confirmed
  // http://localhost:8080/registrations/code/123456789

  constructor(
    private route: ActivatedRoute,
  ) {
    super({ server: 'osd', endpoint: ['registrations', 'code'] })
  }

  ngOnInit() {

    const code = this.route.snapshot.paramMap.get('code');
    const confirmationCode = (code) ? code.substring(0, 8) : ''

    this.params = [confirmationCode]
    this.updateRecord({ id: 0, confirmed: true })

    this.data$.pipe(
      take(1),
    ).subscribe(() => {
      this.isPending$.pipe(
        first(isPending => !isPending),
        take(1)
      ).subscribe(() => {
        console.log('DONE')
      })
    })

  }

}


