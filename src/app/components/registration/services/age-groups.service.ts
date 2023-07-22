import { Injectable } from '@angular/core';

import { AgeGroups } from '../models/age-groups.model';
import { GlobalDataStore } from 'src/app/shared/store/global-data.store';

@Injectable({
  providedIn: 'root'
})
export class AgeGroupsService extends GlobalDataStore<AgeGroups> {

  constructor() {
    super({ server: 'osd', endpoint: ['agegroups'] })
   }

  getData() {
    this.fetchRecords()
  }

}

