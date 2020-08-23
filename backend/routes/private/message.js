const route = require("express").Router();
const createMessage = require("../../controller/message/createMessage");
const getMessages = require("../../controller/message/getMessages");
const getMessage = require("../../controller/message/getMessage");
const deleteMessage = require("../../controller/message/deleteMessage");

route.post("/", createMessage);
route.get("/", getMessages);
route.delete("/", deleteMessage);
route.get("/:messageId", getMessage);

module.exports = route;
