const router = require("express").Router();
const room = require("./chatRoom");

router.use("/room", room);

module.exports = router;
