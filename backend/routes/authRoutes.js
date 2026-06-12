const express = require('express');
const router = express.Router();
const { signup, login, getUsers, toggleBlockUser } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/users', getUsers);
router.put('/users/:id/block', toggleBlockUser);

module.exports = router;
