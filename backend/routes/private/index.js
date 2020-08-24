const router = require("express").Router();
const room = require("./chatRoom");
const message = require("./message");

router.use("/room", [room, message]);

module.exports = router;
