const sql = require("../startup/connectDB");
const UserServices = require("./UserServices.js");
const UserServicesInstance = new UserServices();

class RoomService {
  async create(name, userId) {
    const user = await UserServicesInstance.getUserById(userId);
    if (!user) return;

    const roomId = await this.generateId();

    sql.query(
      "INSERT INTO room (roomId, name, userId)  VALUES (?, ?, UUID_TO_BIN(?));",
      [roomId, name, userId],
      (err, results, field) => {
        if (err) throw err;
      }
    );

    return this.getCurrentCreatedRoom(roomId);
  }

  getRooms() {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT BIN_TO_UUID(roomId) AS roomId, name, BIN_TO_UUID(userId) AS userId FROM room",
        (err, result, field) => {
          if (err) reject(err);

          resolve(result);
        }
      );
    });
  }
  getRoom(roomId) {
    const uuidRegex = /^[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}$/;

    if (!uuidRegex.test(roomId)) return;

    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT BIN_TO_UUID(roomId) AS roomId, name, BIN_TO_UUID(userId) AS userId FROM room WHERE roomId = UUID_TO_BIN(?)  ",
        [roomId],
        (err, result, field) => {
          if (err) reject(err);

          if (!result) return;

          resolve(result[0]);
        }
      );
    });
  }

  generateId() {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT UUID_TO_BIN(UUID()) AS roomId",
        (err, result, field) => {
          if (err) reject(err);

          resolve(result[0].roomId);
        }
      );
    });
  }

  getCurrentCreatedRoom(roomId) {
    let query =
      "SELECT BIN_TO_UUID(roomId) AS roomId, name, BIN_TO_UUID(userId) AS userId FROM room WHERE roomId = ? ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [roomId], (err, result, field) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }
}

module.exports = RoomService;
