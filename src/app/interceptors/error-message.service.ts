import { Injectable } from '@angular/core';

import { ErrorType } from '../shared/snackbar-error/models/error-type.enum';
import { SnackbarErrorService } from '../shared/snackbar-error/snackbar-error.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor(
    private snackbarErrorService: SnackbarErrorService
    ) { }

  displayError(errorMsg: string) {
    this.snackbarErrorService.displayError(`${errorMsg}`, { type: ErrorType.ERROR })
  }

}


