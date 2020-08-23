const MessageServices = require("../../services/MessageServices");
const MessageServicesInstance = new MessageServices();

module.exports = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const message = await MessageServicesInstance.getMessage(messageId);

    if (!message) return res.status(404).send("message not found !");

    return res.status(200).send(message);
  } catch (err) {
    console.log(err);
  }
};
