const io = require("../../startup/socket.io");
const MessageServices = require("../../services/MessageServices");
const MessageServicesInstance = new MessageServices();

module.exports = async (req, res) => {
  const text = req.body.message;
  const userId = req.body.userId;
  const roomId = req.params.roomId;

  const message = await MessageServicesInstance.create(text, userId, roomId);

  if (!message) return res.status(500).send("something error !");

  io.getIO().emit("messages", { action: "create", message: message });
  return res.status(200).send(message);
};
