import { Router } from "@angular/router";
import { AuthServiceService } from "src/app/common/services/auth-service.service";
import { Actions } from "@ngrx/effects";

// add ngrx effects commands here : https://ngrx.io/guide/effects


export class AuthEffects {

  constructor(
      private actions$: Actions,
      private authService: AuthServiceService,
      private router: Router
    ) { }
}
