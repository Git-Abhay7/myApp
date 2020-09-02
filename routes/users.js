var express = require('express');
var router = express.Router();
var usercontroller = require("../controller/controller");
var { create, valid } = require("../validator/user");
var { validation } = require("../commonFunction/validation");
router.post("/addUser", [create(), validation], usercontroller.signUp);
router.post("/login", [valid(), validation], usercontroller.login);
module.exports = router;
