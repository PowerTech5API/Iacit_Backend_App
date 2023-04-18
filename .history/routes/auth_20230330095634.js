const router = require("express").Router();
const authController = require("../controllers/authController");

router.route("/login").get((req, res) => authController.getAll(req, res));