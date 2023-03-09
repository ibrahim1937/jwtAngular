import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/store/reducers/auth.reducers';
import { selectAccessToken } from 'src/app/store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {

  constructor(private store: Store<AuthState>, private location: Location) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    // Declare the access token
    let accessToken : string | null = null;

    // Get the access Token from the ngRx
    this.store.select(selectAccessToken).subscribe((data) => {
      accessToken = data;
      console.log("Access Token: ", accessToken);
    });

    // If the access token exists, then the user is authenticated
    // and should not be able to access the not authenticated pages
    // otherwise, the user is not authenticated and can access the
    // not authenticated pages
    if (accessToken) {
      // navigate to the last visited page if exists
      // otherwise, navigate to the home page
      this.location.back();
      return false;
    }

    return true;
  }

}
