const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');

router.get('/chat/getById/:chatId', chatController.getById);
router.get('/chat/getAll', chatController.getAll);
router.post('/chat/newChat', chatController.createNew);
router.get('/chat/ro/:roId', chatController.getAllByRO);
router.post('/chat/messages', chatController.addMessage);
router.delete('/chat/:chatId', chatController.deleteChat);
router.post('/chat/:chatId', chatController.deleteChat);
router.get('/config/sendEmail', chatController.sendEmail);

module.exports = router;