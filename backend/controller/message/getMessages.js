const MessageServices = require("../../services/MessageServices");
const MessageServicesInstance = new MessageServices();

module.exports = async (req, res) => {
  const roomId = req.params.roomId;
  const messages = await MessageServicesInstance.getMessages(roomId);

  if (!messages) return res.status(500).send("something error !");

  return res.status(200).send(messages);
};
