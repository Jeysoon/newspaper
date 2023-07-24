# SnackbarError

`npm install snackbar-error`

Updated documentation comming soon!

Import it into your module

```
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ErrorMessageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

You can define defaults for Error Message Options

```
ErrorMessageModule.forRoot({
  verticalPosition: 'top',
  horizontalPosition: 'center',
  duration: 3000,
  autoDismiss: false,
  dismissText: 'Done',
}),
```

## Error Message Options

Then inject `ErrorMessageService` the service into your component and define the options

```
constructor(private errorMessageService: ErrorMessageService) {}

  ngOnInit() {

    const options: ErrorMessageOptions = {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      autoDismiss: false,
      duration: 3 * 1000,
      type: ErrorType.NONE
    }

    this.errorMessageService.displayError('Error Message goes here', options)
    
    this.errorMessageService.displayError('Error Message goes here', { type: ErrorType.NONE })
  }
  ```

## Calling the Error Message

Just sending the error message with defined root defuaults

`this.errorMessageService.displayError('Sample 123')`

Sending the error message with the type to display (error, warning, success or none)

`this.errorMessageService.displayError('Sample 123', { type: ErrorType.ERROR })`

Sending options to error message

`this.errorMessageService.displayError('Error Message goes here', options)`

Sending options and custom `<ng-tenplate>` to use for custom error

`this.errorMessageService.displayError('Error Message goes here', options, customComponent)`

## Error Types

There are 3 error types you may use

+ error - This is red and is error related
+ success - This is green and is message of success
+ warning - This is yellow and is message of warning
+ normal - This is grey and is a generic message


## Custom Error Message using <ng-template>

Provide template in HTML file of your custome error style

```
<ng-template #customError let-message="message">
  <div style="height: 52px; padding-top: 16px;">
    <div>
      <mat-icon>info</mat-icon>
    </div>
    <div fxFlex style="font-size: 16pt; color: white; padding-top: 2px; margin-left: 8px;">
      {{ message }}
    </div>
  </div>
</ng-template>
```

Then in the component, get the template of your custom srror style

`@ViewChild('customError', { static: true }) errorTemplate: any`

then provide it in the service

```
constructor(
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit() {

    const options: ErrorMessageOptions = {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      autoDismiss: false,
      duration: 3 * 1000,
      type: ErrorType.NONE
    }

    this.errorMessageService.displayError('Sample 123', options, this.errorTemplate)

  }
  ```
