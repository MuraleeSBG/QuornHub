export const login = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const isLoggedIn = () => {
  return localStorage.getItem("user") !== null;
};

export const getUsersName = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return undefined;
  }
  return JSON.parse(user).name;
};

export const isAdminUser = () => {
  const user = localStorage.getItem("user");
  return user !== null && JSON.parse(user).admin;
};
