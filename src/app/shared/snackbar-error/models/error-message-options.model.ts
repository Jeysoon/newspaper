import { ErrorType } from './error-type.enum';

export interface ErrorMessageOptions {
  verticalPosition?: string
  horizontalPosition?: string
  duration?: number // milliseconds - 3 * 1000
  autoDismiss?: boolean
  dismissText?: string
  type?: ErrorType
}
