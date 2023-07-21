/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegistrationSelectorsService } from './registration-selectors.service';

describe('Service: RegistrationSelectors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationSelectorsService]
    });
  });

  it('should ...', inject([RegistrationSelectorsService], (service: RegistrationSelectorsService) => {
    expect(service).toBeTruthy();
  }));
});
