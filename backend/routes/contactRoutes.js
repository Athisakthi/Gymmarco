const express = require('express');
const router = express.Router();
const { submitContact, getMessages, getUnreadCount, markAsRead, markAllAsRead } = require('../controllers/contactController');

router.post('/', submitContact);
router.get('/messages', getMessages);
router.get('/unread-count', getUnreadCount);
router.put('/messages/:id/read', markAsRead);
router.put('/mark-all-read', markAllAsRead);

module.exports = router;
