export const login = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const isLoggedIn = () => {
  return localStorage.getItem("user") !== null;
};

export const isAdminUser = () => {
  const user = localStorage.getItem("user");
  console.log(JSON.parse(user));
  return user !== null && JSON.parse(user).admin;
};
