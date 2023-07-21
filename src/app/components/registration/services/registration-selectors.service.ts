import { Injectable } from '@angular/core';
import { AgeGroups } from '../models/age-groups.model';
import { Gender } from '../models/genders.model';
import { WhereHeard } from '../models/heard.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationSelectorsService {

  constructor() { }

  genders() {

    const genders = [
      {
          "id": 1,
          "name": "Male"
      },
      {
          "id": 2,
          "name": "Female"
      }
    ]

    return of(genders.map(item => Gender.adapt(item)))

  }

  ageGroups() {

    const ageGroups = [
      {
          "age_start": 30,
          "id": 7,
          "age_end": 39,
          "name": "30 to 39"
      },
      {
          "age_start": 40,
          "id": 8,
          "age_end": 49,
          "name": "40 to 49"
      },
      {
          "age_start": 50,
          "id": 9,
          "age_end": 59,
          "name": "50 to 59"
      },
      {
          "age_start": 60,
          "id": 10,
          "age_end": 90,
          "name": "60+"
      }
    ]

    return of(ageGroups.map(item => AgeGroups.adapt(item)))

  }

  whereHeard() {

    const whereHeard =  [
      {
          "id": 3,
          "name": "Poster"
      },
      {
          "id": 4,
          "name": "Coster"
      },
      {
          "id": 5,
          "name": "Instagram"
      },
      {
          "id": 6,
          "name": "Facebook"
      },
      {
          "id": 7,
          "name": "TikTok"
      },
      {
          "id": 8,
          "name": "LinkedIn"
      }
    ]

    return of(whereHeard.map(item => WhereHeard.adapt(item)))

  }

}
