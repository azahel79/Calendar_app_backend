const { request,response } = require("express")
const jwt = require("jsonwebtoken");
exports.validarToken = async(req = request, res = response,next)=>{
    const token = req.header("x-token");


    if(!token) return res.status(400).json({msg: "no existe el token"});

    try {
        const user = await jwt.verify(token,process.env.SECRET_KEY);
        req.uid = user.uid;
        req.username = user.username;
        next();
    } catch (error) {
        return res.status(400).json({msg: "token expirado"})
    }
}