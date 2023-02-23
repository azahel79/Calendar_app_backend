const express = require("express");
const { check } = require("express-validator");
const { newUser, loginUser, renewToken } = require("../controllers/AuthControllers");
const { validacionesGlobales } = require("../middlewares/validaciones");
const { validarToken } = require("../middlewares/validarToken");
const router =  express.Router();





router.post("/newUser",[
  check("username","nombre de usuario min:5 caracteres").not().isEmpty(),
  check("email","escribe un email valido").isEmail(),
  check("password","contraseña min: 5 caracteres").isLength({min: 5}),
  validacionesGlobales
],newUser);
router.post("/loginUser",[
    check("email","escribe un email valido").isEmail(),
    check("password","escribe una contraseña").not().isEmpty(),
    validacionesGlobales
],loginUser);
router.get("/renew",validarToken,renewToken);


module.exports = router;
