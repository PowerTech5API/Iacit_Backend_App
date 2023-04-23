const router = require("express").Router();

const roController = require("../controllers/roController");

router.route("/ro/getAll").get((req, res) => roController.getAll(req, res));
router.route("/ro/create").post((req, res) => roController.create(req, res));
router.route("/ro/update").put((req, res) => roController.update(req, res));
router.route("/ro/getById/:id").get((req, res) => roController.getById(req, res));
router.route("/ro/delete/:id").delete((req, res) => roController.delete(req, res));
router.route("/ro/status/:status").get((req, res) => roController.getByStatus(req, res));

module.exports = router;