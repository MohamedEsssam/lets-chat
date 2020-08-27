import http from "./httpService";
import jwtDecode from "jwt-decode";
const apiEndpoint = "http://localhost:8000/api/user/";
http.setJwt(getJwt());

export async function login(data) {
  const user = await http.post(apiEndpoint + "login", data);
  localStorage.setItem("token", user.headers["x-auth-token"]);

  return currentUser();
}

export async function register(data) {
  const user = await http.post(apiEndpoint + "register", data);
  localStorage.setItem("token", user.headers["x-auth-token"]);

  return currentUser();
}

export function logout() {
  localStorage.removeItem("token");
}

export function currentUser() {
  try {
    const jwt = getJwt();
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem("token");
}
