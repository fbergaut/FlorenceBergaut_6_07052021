const express = require("express");
const router = express.Router();

const utilisateursCtrl = require("../controllers/utilisateurs");

router.post("/signup", utilisateursCtrl.signup);
router.post("/login", utilisateursCtrl.login);

module.exports = router;
