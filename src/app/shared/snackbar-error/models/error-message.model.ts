import { ErrorType } from './error-type.enum';

export interface ErrorMessageInterface {
  message: string
  verticalPosition: string
  horizontalPosition: string
  duration: number
  autoDismiss: boolean
  dismissText: string
  type: ErrorType
  template: any
}

export class ErrorMessage implements ErrorMessageInterface {

  constructor(
    public message = '',
    public verticalPosition = 'top',
    public horizontalPosition = "center",
    public duration = 3 * 1000,
    public autoDismiss = true,
    public dismissText = 'Ok',
    public type = ErrorType.NONE,
    public template = undefined,
    ) {}

  static adapt(item: any): ErrorMessage {

    return new ErrorMessage(
      item.message,
      item.verticalPosition,
      item.horizontalPosition,
      item.duration,
      item.autoDismiss,
      item.dismissText,
      item.type,
      item.template,
    )

  }

}

