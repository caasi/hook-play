import { useState } from "react";
import { UseUserResult } from "../libs/hook";
import { User } from "../libs";

const johnDoe = {
  id: "0",
  email: "john.doe@example.com",
  username: "John Doe",
};

/**
 * A working useUser hook.
 * @returns A normal useUser result.
 */
const useUser = (): UseUserResult => {
  const [user, setUser] = useState(User.empty);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  return {
    user,
    error,
    isLoading,
    login: (email, password) => {
      setIsLoading(true);
      const p: Promise<User.User> = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === johnDoe.email && password === "password") {
            resolve(johnDoe);
          } else {
            reject(new Error("invalid email or password"));
          }
        }, 1000);
      });
      p.then((user) => setUser(user))
        .catch((err) => {
          setUser(User.empty);
          setError(err);
        })
        .finally(() => setIsLoading(false));
      return p;
    },
    logout: () => {
      setUser(User.empty);
      setError(undefined);
      setIsLoading(false);
      return Promise.resolve();
    },
  };
};

export default useUser;
