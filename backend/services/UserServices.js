const sql = require("../startup/connectDB");
class UserServices {
  login(email, password) {
    const query =
      "SELECT BIN_TO_UUID(userId) AS userId, name, email FROM user WHERE email = ? AND password = ? ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [email, password], (err, result, field) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }

  async register(name, email, password) {
    const user = await this.getUserByEmail(email);
    if (user) return;

    let query =
      "INSERT INTO user (userId, name, email, password)  VALUES (UUID_TO_BIN(UUID()), ?, ?, ?) ;";
    sql.query(query, [name, email, password], (err, results, field) => {
      if (err) throw err;
    });

    query =
      "SELECT BIN_TO_UUID(userId) AS userId, name, email FROM user WHERE email = ? ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [email, password], (err, result, field) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }

  getUserByEmail(email) {
    let query = "SELECT name, email FROM user WHERE email = ? ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [email], (err, result, field) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }
}

module.exports = UserServices;
