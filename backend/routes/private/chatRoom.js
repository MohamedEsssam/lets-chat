const route = require("express").Router();
const createRoom = require("../../controller/chatRoom/createRoom");
const getRooms = require("../../controller/chatRoom/getRooms");
const getRoom = require("../../controller/chatRoom/getRoom");
const updateRoom = require("../../controller/chatRoom/updateRoom");
const deleteRoom = require("../../controller/chatRoom/deleteRoom");

route.post("/", createRoom);
route.get("/", getRooms);
route.put("/", updateRoom);
route.delete("/", deleteRoom);
route.get("/:roomId", getRoom);

module.exports = route;
