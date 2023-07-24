import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { ErrorMessage } from './models/error-message.model';

@Component({
  selector: 'wav-snackbar-error',
  templateUrl: './snackbar-error.component.html',
  styleUrls: ['./snackbar-error.component.scss']
})
export class SnackbarErrorComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ErrorMessage,
    private sbRef: MatSnackBarRef<SnackbarErrorComponent>
  ) { }

  ngOnInit() {

  }

  onDismiss() {
    this.sbRef.dismiss()
  }

}
