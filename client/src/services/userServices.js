import http from "./httpService";
const apiEndpoint = "http://localhost:8000/api/user/";

export async function login(data) {
  const user = await http.post(apiEndpoint + "login", data);
  localStorage.setItem("user", JSON.stringify(user.data));
  return user;
}

export function register(data) {
  const user = http.post(apiEndpoint + "register", data);
  return user;
}

export function logout() {
  localStorage.removeItem("user");
}
