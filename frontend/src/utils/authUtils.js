export const login = (user) => {
	localStorage.setItem("user", JSON.stringify(user));
};

const isLoggedIn = () => {
	return localStorage.getItem("user") !== null;
};
