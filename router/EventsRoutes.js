const express = require("express");
const { check } = require("express-validator");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/EventsControllers");
const { isDate } = require("../helpers/isDate");
const { validacionesGlobales } = require("../middlewares/validaciones");
const { validarToken } = require("../middlewares/validarToken");
const eventosModelo = require("../model/eventosModelo");
const Router = express.Router();

Router.use(validarToken);


Router.get("/",getEventos);

Router.post("/",[
    check("title","escribe un titulo").not().isEmpty(),
    check("start","fecha de inicio obligatorio").custom(isDate),
    check("end","fecha de finalizacion es obligatoria").custom(isDate),
    validacionesGlobales
],crearEvento);

Router.put("/:id",[
    check("title","escribe un titulo").not().isEmpty(),
    check("start","fecha de inicio obligatorio").custom(isDate),
    check("end","fecha de finalizacion es obligatoria").custom(isDate),
    validacionesGlobales
],actualizarEvento);

Router.delete("/:id",eliminarEvento);





module.exports = Router;
