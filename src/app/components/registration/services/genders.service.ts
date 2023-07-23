import { Injectable } from '@angular/core';

import { Gender } from '../models/genders.model';
import { GlobalDataStore } from 'src/app/shared/store/global-data.store';

@Injectable({
  providedIn: 'root'
})
export class GendersService extends GlobalDataStore<Gender> {

  constructor() {
    super({ server: '', endpoint: ['genders'] })
   }

  getData() {
    this.fetchRecords()
  }

}

