const express = require('express');
const router = express.Router();

const configController = require('../controllers/configController');

router.post("/config/saveConfig", configController.saveConfig);
router.get("/config/getByUserId/:userId", configController.getByUserId);
router.get("/config/getLastConfigByUserId/:userId", configController.getLastConfigByUserId);


module.exports = router;