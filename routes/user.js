const router = require("express").Router();

const userController = require("../controllers/userController");

router.route("/user/getAll").get((req, res) => userController.getAll(req, res));
router.route("/user/getById/:id").get((req, res) => userController.getById(req, res));
router.route("/user").post((req, res) => userController.create(req, res));
router.route("/user/login").post((req, res) => userController.login(req, res));
router.route("/user").put((req, res) => userController.update(req, res));
router.route("/user/:id").delete((req, res) => userController.delete(req, res));
router.route("/user/admin").get((req, res) => userController.Admin(req, res));

module.exports = router;