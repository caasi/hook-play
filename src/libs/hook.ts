import { User } from "./user";

/**
 * The useUser hook result. It contains the user, the error, the loading state,
 * and the login and logout functions.
 */
export interface UseUserResult {
  user: User;
  error: Error | undefined;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}
