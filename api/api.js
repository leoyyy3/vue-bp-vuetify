const express = require('express');
const router = express.Router();
const userRoute = require('./routes/user');
const authController = require('./controllers/auth.controller');

router.all('/user/*', userRoute);

//Authentication middleware
router.use(authController.authenticate);

module.exports = router;