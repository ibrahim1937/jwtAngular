import * as auth from "./reducers/auth.reducers";


export interface AppState {
  auth: auth.AuthState;
}
