const route = require("express").Router();
const createMessage = require("../../controller/message/createMessage");
const deleteMessage = require("../../controller/message/deleteMessage");
const getMessages = require("../../controller/message/getMessages");
const getMessage = require("../../controller/message/getMessage");

route.post("/:roomId/messages", createMessage);
route.get("/:roomId/messages", getMessages);
route.delete("/:roomId/messages", deleteMessage);
route.get("/:roomId/messages/:messageId", getMessage);

module.exports = route;
