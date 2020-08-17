const route = require("express").Router();
const login = require("../../controller/login");
const register = require("../../controller/register");

route.post("/login", login);
route.post("/register", register);

module.exports = route;
