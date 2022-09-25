import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  getClientErrorMessage(error: Error): string {
    console.log('ErrorService::getClientErrorMessage');
    return error.message ? error.message : error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    console.log('ErrorService::getServerErrorMessage');
    return navigator.onLine ? error.message : 'No Internet Connection';
  }
}
