const route = require("express").Router();
const createRoom = require("../../controller/chatRoom/createRoom");
const getRooms = require("../../controller/chatRoom/getRooms");
const getRoom = require("../../controller/chatRoom/getRoom");

route.post("/", createRoom);
route.get("/", getRooms);
route.get("/:roomId", getRoom);

module.exports = route;
