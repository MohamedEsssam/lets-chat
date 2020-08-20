const route = require("express").Router();
const login = require("../../controller/user/login");
const register = require("../../controller/user/register");

route.post("/login", login);
route.post("/register", register);

module.exports = route;
