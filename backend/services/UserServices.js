const sql = require("../startup/connectDB");
class UserServices {
  constructor() {}

  login(email, password) {
    const query =
      "SELECT userId, name, email FROM user WHERE email = ? AND password = ?";
    let user;
    sql.query(query, [email, password], (err, results) => {
      user = results;
    });
    if (!user) throw new Error("Wrong email or password");

    return user;
  }

  register(name, email, password) {
    const query =
      "INSERT INTO user (userId, name, email, password)  VALUES (UUID_TO_BIN(UUID()), ?, ?, ?)";
    let user;
    sql.query(query, [name, email, password], (err, results) => {
      user = results;
    });
    if (!user) throw new Error("something wrong happen");

    return user;
  }
}
