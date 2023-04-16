const router = require("express").Router();

const userRouter = require("./user")
const roRouter = require("./ro")
const chatRouter = require("./chat")

router.use("/", userRouter)
router.use("/", roRouter)
router.use("/", chatRouter)

module.exports = router;
