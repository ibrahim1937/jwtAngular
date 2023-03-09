import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/store/reducers/auth.reducers';
import { selectAccessToken, selectAuthState } from 'src/app/store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private store: Store<AuthState>, private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      // Get the access Token from the ngRx store
      // if it exists, then the user is authenticated
      // otherwise, the user is not authenticated
      let accessToken : string | null = null;

      this.store.select(selectAccessToken).subscribe((data) => {
        accessToken = data;
      });

      if (accessToken) {
        return true;
      }

      this.router.navigateByUrl("/login");
      return false;


  }

}
