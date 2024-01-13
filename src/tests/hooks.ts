import { UseUserResult } from "../libs/hook";
import { User } from "../libs";

export const useJaneDoe = (): UseUserResult => {
  return {
    user: {
      id: "1",
      username: "Jane Doe",
      email: "jane.doe@example.com",
    },
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
