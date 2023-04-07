const router = require("express").Router();

const userRouter = require("./user")
const roRouter = require("./ro")

router.use("/", userRouter)
router.use("/", roRouter)

module.exports = router;
