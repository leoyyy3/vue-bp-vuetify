// Setting api router
var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');

// Route to login and issue a json web token
router.route('/user/login').post(userController.userLogin);

// Create user
router.route('/user/create').post(userController.createUser);

//Update email
router.route('/user/update').put(userController.updateUser);

// Export database
module.exports = router;
