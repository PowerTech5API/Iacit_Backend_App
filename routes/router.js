const router = require("express").Router();

const userRouter = require("./user")
const roRouter = require("./ro")
const chatRouter = require("./chat")
const configRouter = require("./config")
const termsRouter = require("./terms")

router.use("/", userRouter)
router.use("/", roRouter)
router.use("/", chatRouter)
router.use("/", configRouter)
router.use("/", termsRouter)

module.exports = router;
