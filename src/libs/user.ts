export interface User {
  id: string;
  email: string;
  username: string;
}

export const empty: User = {
  id: "",
  email: "",
  username: "",
};

/**
 * Check if the user is empty.
 * @param user The user to check.
 * @returns If the user is empty.
 */
export const isEmpty = (user: User): boolean => {
  return user.id === "" && user.email === "" && user.username === "";
};
