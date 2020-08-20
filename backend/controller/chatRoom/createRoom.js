const RoomServices = require("../../services/RoomServices");
const RoomServicesInstance = new RoomServices();

module.exports = async (req, res) => {
  const name = req.body.name;
  const userId = req.body.userId;

  const room = await RoomServicesInstance.create(name, userId);

  if (!room) return res.status(500).send("something error !");

  return res.status(200).send(room);
};
