let keysToRemove = ["token", "loginUserData"];

export const getJWTToken = () => localStorage.getItem('token');
export let authorizationToken = `Bearer ${getJWTToken()}`;
export const isLoggedIn = getJWTToken();

const setJWTToken = (token) => {
    localStorage.setItem('token', token);
};

export const setUserData = (userData) => {
    localStorage.setItem('loginUserData', JSON.stringify(userData));
}

export const storeTokenInLS = (serverToken) => {
    setJWTToken(serverToken);
    return localStorage.setItem("token", serverToken);
};

const clearLocalStorage = () => {
    for (let key of keysToRemove) {
        localStorage.removeItem(key);
    }
}
export const LogoutUser = () => {
    setJWTToken(null);
    return clearLocalStorage();
};
