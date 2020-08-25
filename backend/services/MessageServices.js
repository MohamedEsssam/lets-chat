const sql = require("../startup/connectDB");
const UserServices = require("./UserServices.js");
const UserServicesInstance = new UserServices();

class MessageService {
  async create(message, userId, roomId) {
    const user = await UserServicesInstance.getUserById(userId);
    if (!user) return;

    const messageId = await this.generateId();

    sql.query(
      "INSERT INTO message (messageId, message, sendAt, userId, roomId) VALUES (UUID_TO_BIN(?), ?, NOW(), UUID_TO_BIN(?), UUID_TO_BIN(?));",
      [messageId, message, userId, roomId],
      (err, results, field) => {
        if (err) throw err;
      }
    );

    return this.getCurrentCreatedMessage(messageId);
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

    return this.getCurrentCreatedMessage(roomId);
  }

  async delete(messageId, userId) {
    if (!this.validId(messageId)) return;
    if (!this.validId(userId)) return;

    const message = await this.getMessage(messageId, userId);
    if (!message) return;

    sql.query(
      "DELETE FROM message WHERE messageId = UUID_TO_BIN(?) AND userId = UUID_TO_BIN(?)",
      [messageId, userId],
      (err, result) => {
        if (err) throw err;
      }
    );

    return message;
  }

  getMessages(roomId) {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT BIN_TO_UUID(messageId) AS messageId, message, sendAt, BIN_TO_UUID(userId) AS userId, u.name AS username,BIN_TO_UUID(roomId) AS roomId FROM message JOIN user u USING (userId) WHERE roomId = UUID_TO_BIN(?) ORDER BY sendAt",
        [roomId],
        (err, result, field) => {
          if (err) reject(err);

          resolve(result);
        }
      );
    });
  }

  getMessage(messageId, userId) {
    if (!this.validId(messageId)) return;

    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT BIN_TO_UUID(messageId) AS messageId, message, sendAt, BIN_TO_UUID(userId) AS userId, u.name AS username,BIN_TO_UUID(roomId) AS roomId FROM message JOIN user u USING (userId) WHERE messageId = UUID_TO_BIN(?) And userId = UUID_TO_BIN(?)  ",
        [messageId, userId],
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

  getCurrentCreatedMessage(messageId) {
    let query =
      "SELECT BIN_TO_UUID(messageId) AS messageId, message, sendAt, BIN_TO_UUID(userId) AS userId, u.name AS username,BIN_TO_UUID(roomId) AS roomId FROM message JOIN user u USING (userId) WHERE messageId = UUID_TO_BIN(?) ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [messageId], (err, result, field) => {
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

module.exports = MessageService;
