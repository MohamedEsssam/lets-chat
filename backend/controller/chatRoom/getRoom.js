const RoomServices = require("../services/RoomServices");
const RoomServicesInstance = new RoomServices();

module.exports = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await RoomServicesInstance.getRoom(roomId);

    if (!room) return res.status(404).send("room not found !");

    return res.status(200).send(room);
  } catch (err) {
    console.log(err);
  }
};
