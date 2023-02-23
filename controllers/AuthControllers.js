const { response,request } = require("express");
const {hashSync,genSaltSync,compareSync} = require("bcryptjs");
const usuariosModelo = require("../model/usuariosModelo");
const { crearToken } = require("../helpers/crearToken");

exports.newUser = async(req = request,res = response)=>{
    try {

       const usuarioExistente = await usuariosModelo.findOne({email: req.body.email});   

       if(usuarioExistente)  return res.status(400).json({msg: "ese email ya esta registrado",ok:false});


      const salt = genSaltSync(10);
      req.body.password = hashSync(req.body.password,salt);
     
       const crearUsuario = new usuariosModelo(req.body);

        await crearUsuario.save();
         
        const token = await crearToken(crearUsuario._id,crearUsuario.username);


        res.status(200).json({msg: "se creo al usuario",ok:true,uid: crearUsuario._id,username: crearUsuario.username,token})
      
    
    } catch (error) {
         console.log(error);
         res.status(500).json({msg: "hubo un error"})
    }
}


exports.loginUser = async(req = request,res = response)=>{
    try {
        const usuario = await usuariosModelo.findOne({email: req.body.email});   

       if(!usuario)  return res.status(400).json({msg: "no existe el usuario"});

       const passwordCorrecta = await  compareSync(req.body.password,usuario.password);

       if(!passwordCorrecta)  return res.status(400).json({msg: "contraseña incorrecta"})

       const token = await crearToken(usuario._id,usuario.username);

       res.status(200).json({msg: "iniciar sesion",ok:true,uid: usuario._id,username: usuario.username,token})


    } catch (error) {
         console.log(error);
         res.status(500).json({msg: "hubo un error"})
    }
}

exports.renewToken = async(req = request,res = response)=>{
   try {
     
       
      const token = await crearToken(req.uid,req.username);


    res.status(200).json({ok: true,token})
     

   } catch (error) {
        console.log(error);
        res.status(500).json({msg: "hubo un error"})
   }
}