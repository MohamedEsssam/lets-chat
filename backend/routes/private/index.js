const router = require("express").Router();
const room = require("./chatRoom");
const message = require("./message");
const authJwt = require("../../middleware/authJwt");

router.use("/room", [room, message, authJwt]);

module.exports = router;
