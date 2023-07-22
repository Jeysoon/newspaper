import { Injectable } from '@angular/core';

import { WhereHeard } from '../models/heard.model';
import { GlobalDataStore } from 'src/app/shared/store/global-data.store';

@Injectable({
  providedIn: 'root'
})
export class WhereHeardService extends GlobalDataStore<WhereHeard> {

  constructor() {
    super({ server: 'osd', endpoint: ['heard'] })
   }

  getData() {
    this.fetchRecords()
  }

}

