export const login = (user) => {
	localStorage.setItem("user", JSON.stringify(user));
};

export const isLoggedIn = () => {
	return localStorage.getItem("user") !== null;
};
