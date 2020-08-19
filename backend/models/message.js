const sql = require("../startup/connectDB");

const query =
  "DROP TABLE IF EXISTS message; CREATE TABLE message (messageId BINARY(16) NOT NULL PRIMARY KEY, message VARCHAR(255) NOT NULL, userId BINARY(16) NOT NULL, roomId BINARY(16) NOT NULL, CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT fk_roomId FOREIGN KEY (roomId) REFERENCES room(roomId) ON DELETE RESTRICT ON UPDATE CASCADE)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
