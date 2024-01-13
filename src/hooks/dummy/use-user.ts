import { UseUserResult } from "../../libs/hook";
import { User } from "../../libs";

/**
 * The dummy useUser hook.
 * @returns The dummy useUser result.
 */
const useUser = (): UseUserResult => {
  return {
    user: User.empty,
    error: undefined,
    isLoading: false,
    login: () => {
      return Promise.resolve(User.empty);
    },
    logout: () => {
      return Promise.resolve();
    },
  };
};

export default useUser;
