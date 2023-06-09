const router = require("express").Router();

const roController = require("../controllers/roController");

router.route("/ro/getAll").get((req, res) => roController.getAll(req, res));
router.route("/ro/getAllByUserId/:userId").get((req, res) => roController.getAllByUserId(req, res));
router.route("/ro/create").post((req, res) => roController.create(req, res));
router.route("/ro/update").put((req, res) => roController.update(req, res));
router.route("/ro/getById/:id").get((req, res) => roController.getById(req, res));
router.route("/ro/delete/:id").delete((req, res) => roController.delete(req, res));
router.route("/ro/status/:status").get((req, res) => roController.getByStatus(req, res));
router.route("/ro/userStatus/:status").get((req, res) => roController.getByUserStatus(req, res));
router.route("/ro/getOrgaos").get((req, res) => roController.getOrgaos(req, res));
router.route("/ro/filterRo").post((req, res) => roController.filterRos(req, res));
router.route("/ro/filterRoUser").post((req, res) => roController.filterRosUser(req, res));
router.route("/ro/analise").put((req, res) => roController.analise(req, res));
router.route("/ro/recorrer").put((req, res) => roController.recorrer(req, res));


module.exports = router;    