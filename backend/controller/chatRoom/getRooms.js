const RoomServices = require("../services/RoomServices");
const RoomServicesInstance = new RoomServices();

module.exports = async (req, res) => {
  const rooms = await RoomServicesInstance.getRooms();

  if (!rooms) return res.status(500).send("something error !");

  return res.status(200).send(rooms);
};
