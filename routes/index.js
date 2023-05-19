const express = require('express');
const ROUTE = express.Router();
const userController = require('../controller')
const authorize = require('../services')
ROUTE.post('/signup',userController.signup)

ROUTE.post('/login',userController.login)

ROUTE.get('/get-user',authorize("user"),userController.getUser)

module.exports = ROUTE