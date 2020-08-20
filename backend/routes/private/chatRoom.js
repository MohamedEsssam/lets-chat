const route = require("express").Router();
const createRoom = require("../../controller/createRoom");
const getRooms = require("../../controller/getRooms");
const getRoom = require("../../controller/getRoom");

route.post("/", createRoom);
route.get("/", getRooms);
route.get("/:roomId", getRoom);

module.exports = route;
