const router = require("express").Router();

const userRouter = require("./user")
const roRouter = require("./ro")
const chatRouter = require("./chat")
const configRouter = require("./config")

router.use("/", userRouter)
router.use("/", roRouter)
router.use("/", chatRouter)
router.use("/", configRouter)

module.exports = router;
