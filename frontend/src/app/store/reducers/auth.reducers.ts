import { User } from "src/app/common/models/user";
import { createReducer, on } from "@ngrx/store";
import { initialStateError, removeAccessToken, removeErrorMessage, removeUser, setAccessToken, setErrorMessage, setInitialState, setIsAuthenticated, setUser } from "../actions/auth.actions";

// Defining the state of the auth store

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
  ready: boolean;
}

// Defining the initial state of the auth store
export const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  user: null,
  errorMessage: null,
  ready: false
}


// Defining the reducer for the auth store
export const authReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user: user })),
  on(setAccessToken, (state, { accessToken }) => ({ ...state, accessToken: accessToken })),
  on(setErrorMessage, (state, { errorMessage }) => ({ ...state, errorMessage: errorMessage })),
  on(setIsAuthenticated, (state, { isAuthenticated }) => ({ ...state, isAuthenticated: isAuthenticated })),
  on(removeUser, (state) => ({ ...state, user: null })),
  on(removeAccessToken, (state) => ({ ...state, accessToken: null })),
  on(removeErrorMessage, (state) => ({ ...state, errorMessage: null })),
  on(setInitialState, (state, { ready , accessToken}) => ({ ...state, ready , accessToken})),
  on(initialStateError, (state, { ready , accessToken}) => ({ ...state, ready , accessToken}))
);
