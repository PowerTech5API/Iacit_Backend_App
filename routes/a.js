const express = require('express');
const router = express.Router();

const termsController = require('../controllers/termsController');

router.post("/terms/create", termsController.createTerm);
router.get("/terms/getAll", termsController.getAllTerms);
router.get("/terms/GetByVersion/:version", termsController.getTermByVersion);

module.exports = router;