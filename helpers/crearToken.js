const jwt = require("jsonwebtoken");

exports.crearToken = (uid,username)=>{
    
    return new Promise((resolve,reject)=>{
        const payload = {uid,username};
        jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn: "2h"
        },(err,token)=>{
            if(err) return reject("error al generar el token");
             resolve(token);
        })
    })
}