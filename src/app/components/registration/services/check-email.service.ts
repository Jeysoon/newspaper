import { Injectable } from '@angular/core';

import { EmailExists } from '../models/email-exists.model';
import { GlobalDataStore } from 'src/app/shared/store/global-data.store';

@Injectable({
  providedIn: 'root'
})
export class CheckEmailService extends GlobalDataStore<EmailExists> {

  constructor() {
    super({ server: '', endpoint: ['registrations', 'email'] })
   }

  getData() {
    this.fetchRecords()
  }

}

