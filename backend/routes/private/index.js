const router = require("express").Router();
const room = require("./chatRoom");
const message = require("./message");

router.use("/room", room);
router.use("/message", message);

module.exports = router;
