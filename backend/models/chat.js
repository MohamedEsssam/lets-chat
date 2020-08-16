const sql = require("../startup/connectDB");

const query =
  "DROP TABLE IF EXISTS chat; CREATE TABLE chat (chatId BINARY(16) NOT NULL PRIMARY KEY, userId BINARY(16) NOT NULL, messageId BINARY(16) NOT NULL, CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT fk_message FOREIGN KEY (messageId) REFERENCES message(messageId) ON DELETE RESTRICT ON UPDATE CASCADE)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
