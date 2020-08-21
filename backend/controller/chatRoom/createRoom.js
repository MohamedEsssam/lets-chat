const io = require("../../startup/socket.io");
const RoomServices = require("../../services/RoomServices");
const RoomServicesInstance = new RoomServices();

module.exports = async (req, res) => {
  const name = req.body.name;
  const userId = req.body.userId;

  const room = await RoomServicesInstance.create(name, userId);

  if (!room) return res.status(500).send("something error !");

  io.getIO().emit("rooms", { action: "create", room: room });
  return res.status(200).send(room);
};
