import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';

import { LoadingService } from '../services/loading.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly snackBar: MatSnackBar
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.start();
    console.log(`[API] ${req.method} ${req.urlWithParams}`);

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log(`[API] ${req.method} ${req.urlWithParams} -> ${event.status}`);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const message =
          error.error?.message ||
          error.message ||
          'Something went wrong while talking to the server.';

        this.snackBar.open(message, 'Close', {
          duration: 3500,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

        return throwError(() => error);
      }),
      finalize(() => this.loadingService.stop())
    );
  }
}
