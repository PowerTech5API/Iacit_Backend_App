const express = require('express');
const router = express.Router();

const configController = require('../controllers/configController');

router.post("/config/saveConfig", configController.saveConfig);
router.get("/config/getByUserId/:userId", configController.getByUserId);


module.exports = router;