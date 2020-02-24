var express = require('express');
var router = express.Router();


const controller = require('../controller/main');

router.get('/register', controller.getRegisterPage); // get Register Page
router.get('/', controller.getHomePage); // get Home Page
router.get('/locate', controller.getLocatePage); // get Locate Page
router.get('/upload', controller.uploadResume); // get Locate Page

module.exports = router