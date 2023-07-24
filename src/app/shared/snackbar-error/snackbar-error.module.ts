import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ErrorMessageOptions } from './models/error-message-options.model';

import { SnackbarErrorComponent } from './snackbar-error.component';

@NgModule({
  declarations: [
    SnackbarErrorComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    SnackbarErrorComponent
  ],
})
export class SnackbarErrorModule {

  static forRoot(snackbarOptions: ErrorMessageOptions): ModuleWithProviders<SnackbarErrorModule> {

    return {
      ngModule: SnackbarErrorModule,
      providers: [
        { provide: 'snackbar-options', useValue: snackbarOptions },
      ]
    }
  }

}
