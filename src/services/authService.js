import http from './httpService';
import jwtDecode from 'jwt-decode';
// import config from "../config.json";

const apiEndpoint = '/auths';
// const apiEndpoint = config.apiUrl + '/auths';
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, {
        email,
        password
    });
    // return http.post(apiEndpoint, {
    //     email,
    //     password
    // });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
    // const jwt = localStorage.getItem('token');
    // console.log(jwt);
    // return jwtDecode(jwt);
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export default {
    login,
    loginWithJwt,
    getCurrentUser,
    getJwt,
    logout
}