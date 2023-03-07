import { createAction, props } from "@ngrx/store";
import { User } from "src/app/common/models/user";



export const setUser = createAction(
  "[Auth] Set User",
  props<{ user : User}>()
)

export const setAccessToken = createAction(
  "[Auth] Set Access Token",
  props<{ accessToken : string}>()
)

export const setErrorMessage = createAction(
  "[Auth] Set Error Message",
  props<{ errorMessage : string}>()
)

export const setIsAuthenticated = createAction(
  "[Auth] Set Is Authenticated",
  props<{ isAuthenticated : boolean}>()
)

export const removeUser = createAction(
  "[Auth] Remove User"
)

export const removeAccessToken = createAction(
  "[Auth] Remove Access Token"
)

export const removeErrorMessage = createAction(
  "[Auth] Remove Error Message"
)


export const login = createAction(
  "[Auth] Login",
  props<{ email: string, password: string }>()
);

export const loginError = createAction(
  "[Auth] Login Error",
  props<{ message: string }>()
);

export const logout = createAction(
  "[Auth] Logout"
);
