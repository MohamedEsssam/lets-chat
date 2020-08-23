const MessageServices = require("../../services/MessageServices");
const MessageServicesInstance = new MessageServices();

module.exports = async (req, res) => {
  const messages = await MessageServicesInstance.getMessages();

  if (!messages) return res.status(500).send("something error !");

  return res.status(200).send(messages);
};
