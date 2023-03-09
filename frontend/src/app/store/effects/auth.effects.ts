import { Router } from "@angular/router";
import { AuthServiceService } from "src/app/common/services/auth-service.service";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { Injectable } from "@angular/core";
// import { AuthActionTypes, LogIn, LogInFailure, LogInSuccess } from "../actions/auth.actions";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators/map";
import { catchError, mergeMap, of, switchMap, tap } from 'rxjs';
import { initialStateError, login, loginError, logout, setAccessToken, setInitialState,  } from "../actions/auth.actions";


// add ngrx effects commands here : https://ngrx.io/guide/effects

@Injectable()
export class AuthEffects {

  constructor(
      private actions$: Actions,
      private authService: AuthServiceService,
      private router: Router
    ) { }


    login$ = createEffect(()  => {
      return this.actions$.pipe(
        ofType(login),
        switchMap(({ email, password }) => {
          return this.authService.login(email, password).pipe(
            // add token and set isAuthenticated to true
            map(({ token }) => setAccessToken({ accessToken: token })),
            tap(() => this.router.navigate(["/"])),
            catchError(() => of(loginError({ message: "Login failed 1" })))
          )
        })
      );
    });

    // on logout, just remove the token
    // and navigate to login page
    // no need to dispatch any actions after that
    logout$ = createEffect(()  => {
      return this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate(["/login"]);
        })
      );
    });


    // when app has started, get the user data
    // using  a post request to the server
    // and put into the store

    init$ = createEffect(()  => {
      return this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        mergeMap(() => {
          return this.authService.getAccessToken()
          .pipe(
            map((data) => setInitialState({ accessToken: data.token, ready: true })),
            catchError(() => of(initialStateError({ accessToken: null, ready: true })))
          )
        })
      );
    });

  }
