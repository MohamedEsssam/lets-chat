const io = require("../../startup/socket.io");
const RoomServices = require("../../services/RoomServices");
const RoomServicesInstance = new RoomServices();

module.exports = async (req, res) => {
  const roomId = req.body.roomId;
  const userId = req.body.userId;

  const room = await RoomServicesInstance.delete(roomId, userId);

  if (!room) return res.status(500).send("something error can't delete!");

  io.getIO().emit("rooms", { action: "delete", room: room });
  return res.status(200).send(room);
};
