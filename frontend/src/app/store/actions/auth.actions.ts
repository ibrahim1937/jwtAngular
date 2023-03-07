import { Action } from "@ngrx/store";




export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: { email: string; password: string }) {}
}

export type All =
  | Login;
