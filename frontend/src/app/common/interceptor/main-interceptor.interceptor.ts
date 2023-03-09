import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { filter, Observable, tap } from 'rxjs';
import { AuthState } from 'src/app/store/reducers/auth.reducers';
import { Store } from '@ngrx/store';
import { selectAccessToken } from 'src/app/store/selectors/auth.selectors';
import { setAccessToken } from 'src/app/store/actions/auth.actions';

@Injectable(
)
export class MainInterceptorInterceptor implements HttpInterceptor {

  constructor(private store: Store<AuthState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);

    // Intercept the request and add the token to the header if it exists
    let accessToken : string | null = null;
    this.store.select(selectAccessToken).subscribe((data) => {
      accessToken = data;
    });


    // Add access Token to the header

    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
          AcceptHeaders: '*/*'
        },
      });
    }

    // Add with credentials to the header
    request = request.clone({
      withCredentials: true
    });


    // Check in the response for the new_access_token in the header and update the store
    return next.handle(request)
        .pipe(
            filter(event => event instanceof HttpResponse),
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log("Response: ", event.headers);
                    const newAccessToken = event.headers.get('new_access_token');
                    if (newAccessToken) {
                      console.log("New Access Token: ", newAccessToken);
                      this.store.dispatch(setAccessToken({accessToken: newAccessToken}));
                    }
                }
            }))
  }
}
