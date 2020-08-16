const sql = require("../startup/connectDB");

const query =
  "DROP TABLE IF EXISTS room; CREATE TABLE room (roomId BINARY(16) NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL, chatId BINARY(16) NOT NULL, userId BINARY(16) NOT NULL, CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT fk_chatId FOREIGN KEY (chatId) REFERENCES chat(chatId) ON DELETE RESTRICT ON UPDATE CASCADE)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
