const io = require("../../startup/socket.io");
const RoomServices = require("../../services/RoomServices");
const RoomServicesInstance = new RoomServices();

module.exports = async (req, res) => {
  const newName = req.body.name;
  const roomId = req.body.roomId;
  const userId = req.body.userId;

  const room = await RoomServicesInstance.update(newName, roomId, userId);

  if (!room) return res.status(500).send("something error can't update!");

  io.getIO().emit("rooms", { action: "update", room: room });
  return res.status(200).send(room);
};
