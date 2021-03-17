const express = require("express");
const userRegister = require("../controllers/userRegister");
const userLogin = require("../controllers/userLogin");
const userAuth = require("../controllers/userAuth");
const router = express.Router();

router.use("/register", userRegister);
router.use("/signin", userLogin);
router.use("/auth", userAuth);

module.exports = router;
