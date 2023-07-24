import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageOptions } from './models/error-message-options.model';

import { ErrorMessage } from './models/error-message.model';
import { SnackbarErrorComponent } from './snackbar-error.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarErrorService {

  snackOpen = false
  sb: any

  get defaultOptions() {

    return ErrorMessage.adapt({
      verticalPosition : this.options.verticalPosition,
      horizontalPosition: this.options.horizontalPosition,
      duration: this.options.duration,
      autoDismiss: this.options.autoDismiss,
      dismissText: this.options.dismissText,
      type: this.options.type,
    })

  }

  constructor(
    @Inject('snackbar-options') private options: ErrorMessageOptions,
    private snackBar: MatSnackBar
    ) { }

  displayError(message: string = '', options: ErrorMessageOptions|any = this.defaultOptions, template?: any) {

    const defaults = { ...this.defaultOptions, ...options}
    const errorOptions = (options) ? ErrorMessage.adapt({ ...defaults, ...{ message }, ...{ template }}) : {}

    if(!this.snackOpen) {
      this.sb = this.snackBar.openFromComponent(SnackbarErrorComponent, { data: errorOptions, ...defaults })
      this.snackOpen = true
    }

    this.sb.afterDismissed().subscribe((info: any) => {
      this.snackOpen = (info.dismissedByAction === true) ? false : false
    })

  }

}

