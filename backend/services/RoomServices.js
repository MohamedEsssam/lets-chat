const sql = require("../startup/connectDB");
const UserServices = require("./UserServices.js");
const UserServicesInstance = new UserServices();

class RoomService {
  async create(name, userId) {
    const user = await UserServicesInstance.getUserById(userId);
    if (!user) return;

    const roomId = await this.generateId();

    sql.query(
      "INSERT INTO room (roomId, name, createdAt, userId)  VALUES (UUID_TO_BIN(?), ?, NOW(), UUID_TO_BIN(?));",
      [roomId, name, userId],
      (err, results, field) => {
        if (err) throw err;
      }
    );

    return this.getCurrentCreatedRoom(roomId);
  }

  async update(newName, roomId, userId) {
    if (!this.validId(roomId)) return;
    if (!this.validId(userId)) return;

    sql.query(
      "UPDATE room SET name = ? WHERE roomId = UUID_TO_BIN(?) AND userId = UUID_TO_BIN(?)",
      [newName, roomId, userId],
      (err, result, field) => {
        if (err) throw err;
      }
    );

    return this.getCurrentCreatedRoom(roomId);
  }

  async delete(roomId, userId) {
    if (!this.validId(roomId)) return;
    if (!this.validId(userId)) return;

    const room = await this.getCurrentCreatedRoom(roomId);
    if (!room) return;

    sql.query(
      "START TRANSACTION; DELETE FROM message WHERE roomId = UUID_TO_BIN(?) AND userId = UUID_TO_BIN(?); DELETE FROM room WHERE roomId = UUID_TO_BIN(?) AND userId = UUID_TO_BIN(?); COMMIT;",
      [roomId, userId, roomId, userId],
      (err, result) => {
        if (err) throw err;
      }
    );

    return room;
  }

  getRooms(filter) {
    const roomName = "^" + filter;
    let rooms;
    if (filter) {
      rooms = new Promise((resolve, reject) => {
        sql.query(
          "SELECT BIN_TO_UUID(roomId) AS roomId, name, BIN_TO_UUID(userId) AS userId FROM room WHERE name REGEXP (?) ORDER BY createdAt DESC",
          [roomName],
          (err, result, field) => {
            if (err) reject(err);

            resolve(result);
          }
        );
      });
    } else
      rooms = new Promise((resolve, reject) => {
        sql.query(
          "SELECT BIN_TO_UUID(roomId) AS roomId, name, BIN_TO_UUID(userId) AS userId FROM room ORDER BY createdAt DESC",
          (err, result, field) => {
            if (err) reject(err);

            resolve(result);
          }
        );
      });

    return rooms;
  }

  getRoom(roomId) {
    if (!this.validId(roomId)) return;

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
      sql.query("SELECT UUID() AS roomId", (err, result, field) => {
        if (err) reject(err);

        resolve(result[0].roomId);
      });
    });
  }

  getCurrentCreatedRoom(roomId) {
    let query =
      "SELECT BIN_TO_UUID(roomId) AS roomId, name,createdAt, BIN_TO_UUID(userId) AS userId FROM room WHERE roomId = UUID_TO_BIN(?) ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [roomId], (err, result, field) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }

  validId(id) {
    const uuidRegex = /^[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}$/;

    return uuidRegex.test(id);
  }
}

module.exports = RoomService;
