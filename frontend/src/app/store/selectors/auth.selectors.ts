import { createFeatureSelector, createSelector } from "@ngrx/store";
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
