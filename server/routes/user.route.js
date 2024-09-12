const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller')
const auth = require('../middleware/auth');
const authController = require('../controllers/auth.controller');


router.route('/profile')
.get(auth('readOwn', 'profile'), usersController.profile)
.patch(auth('updateOwn', 'profile'), usersController.updateProfile)


router.patch('/email', auth('updateOwn', 'profile'), usersController.updateEmail)
router.get('/verify', usersController.verifyAccount)

module.exports= router; 