import { User } from "src/app/common/models/user";

// Defining the state of the auth store

export interface State {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

// Defining the initial state of the auth store
export const initialState: State = {
  accessToken: null,
  isAuthenticated: false,
  user: null,
  errorMessage: null
}
