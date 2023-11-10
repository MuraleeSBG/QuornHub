export const login = (user) => {
	localStorage.setItem("user", JSON.stringify(user));
};

export const logout = () => {
	localStorage.removeItem("user");
};

export const isLoggedIn = () => {
	return localStorage.getItem("user") !== null;
};
