const io = require("../../startup/socket.io");
const MessageServices = require("../../services/MessageServices");
const MessageServicesInstance = new MessageServices();

module.exports = async (req, res) => {
  const messageId = req.body.messageId;
  const userId = req.body.userId;

  const message = await MessageServicesInstance.delete(messageId, userId);

  if (!message) return res.status(500).send("something error can't delete!");

  io.getIO().emit("messages", { action: "delete", message: message });
  return res.status(200).send(message);
};
