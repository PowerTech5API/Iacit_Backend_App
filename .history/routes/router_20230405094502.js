const router = require("express").Router();

const userRouter = require("./user");
const authRouter = require("./auth");

router.use("/users", userRouter);
router.use("/auth", authRouter);

module.exports = router;
