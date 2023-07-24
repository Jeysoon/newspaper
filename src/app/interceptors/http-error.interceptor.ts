import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

import { delayedRetry } from "./delay-retry.operator";
import { ErrorMessageService } from "./error-message.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  delayNextRequestBy = 1.5*1000
  numberOfRetries = 2

    constructor(
      private errorService: ErrorMessageService,
      ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(request)
        .pipe(
          delayedRetry(this.delayNextRequestBy, this.numberOfRetries),
          catchError((interceptorError: { source: HttpErrorResponse, message: string } | HttpErrorResponse) => {
            let error = interceptorError instanceof  HttpErrorResponse ? interceptorError : interceptorError.source;
            let errorMsg = ''

            const action = "OK"

            if (error.error instanceof ErrorEvent || error?.error?.message) {
              errorMsg = `Error: ${error.error.message}`;
            }
            else {
              if(error.error?.length){

                errorMsg = `Error Code: ${error.status} ${error.statusText}, Message: ${error.error}`

              } else if(error.error?.error_message?.length) {

                errorMsg = `Error Code: ${error.status} ${error.statusText}, Message: ${error.error.error_message}`

              } else if(error.statusText){

                errorMsg = `Error Code: ${error.status} , Message: ${error.statusText}`

              } else {
                const err = error?.message || error
                errorMsg = String(err)
              }
            }

            this.errorService.displayError(errorMsg)

            return throwError(error)

          })
        )
    }

  }
