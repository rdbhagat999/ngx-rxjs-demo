import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { ErrorService } from './services/error.service';
import { LoggingService } from './services/logging.service';
import { NotificationService } from './services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const loggerService = this.injector.get(LoggingService);
    const notifierService = this.injector.get(NotificationService);

    let message = '';
    let stackTrace = '';

    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerErrorMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);
      notifierService.showError(message);
    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
      notifierService.showError(message);
    }

    // Always log errors
    loggerService.logError(message, stackTrace);
    console.error(error);
  }
}
