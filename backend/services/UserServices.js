const sql = require("../startup/connectDB");
const bcrypt = require("bcrypt");
class UserServices {
  async login(email, password) {
    // const query =
    //   "SELECT BIN_TO_UUID(userId) AS userId, name, email FROM user WHERE email = ? AND password = ? ;";

    // return new Promise((resolve, reject) => {
    //   sql.query(query, [email, password], (err, result, field) => {
    //     if (err) reject(err);

    //     resolve(result[0]);
    //   });
    // });

    const user = await this.getUserByEmail(email);
    if (!user) return;
    if (!(await bcrypt.compare(password, user.password))) return;

    delete user["password"];
    return user;
  }

  async register(name, email, password) {
    const user = await this.getUserByEmail(email);
    if (user) return;

    password = await this.encryptPassword(password);

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
    let query =
      "SELECT BIN_TO_UUID(userId) AS userId, name, email, password FROM user WHERE email = ? ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [email], (err, result, field) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }

  getUserById(userId) {
    let query = "SELECT * FROM user WHERE userId = UUID_TO_BIN(?);";

    return new Promise((resolve, reject) => {
      sql.query(query, [userId], (err, result, field) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }

  async encryptPassword(password) {
    const genSalt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, genSalt);
  }
}

module.exports = UserServices;
