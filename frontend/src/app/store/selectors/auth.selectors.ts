import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthState } from "../reducers/auth.reducers";


// Defining the selectors for the auth store
export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectAccessToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.accessToken
);

export const selectErrorMessage = createSelector(
  selectAuthState,
  (state: AuthState) => state.errorMessage
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectInitializationState = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectReady = createSelector(
  selectAuthState,
  (state: AuthState) => state.ready
);
