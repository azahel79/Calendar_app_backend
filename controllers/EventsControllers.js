const { response } = require("express")
const { request } = require("express")
const eventosModelo = require("../model/eventosModelo")

exports.getEventos = async(req = request,res = response)=>{
   try {
        const listaEventos = await eventosModelo.find()
        .populate('user','name');
        res.status(200).json({
            ok: true,
            listaEventos
        })
   } catch (error) {
       return res.status(500).json({msg: "error en el servidor"})
   }
}

exports.crearEvento = async(req = request,res = response)=>{
    try {
        const evento = new eventosModelo(req.body);
        evento.user = req.uid;
        await evento.save();
       res.status(200).json({
           ok: true,
           evento
       })
    } catch (error) {
        return res.status(500).json({msg: "error en el servidor"})
    }
 }


 exports.actualizarEvento = async(req = request,res = response)=>{
    try {
       const evento = await eventosModelo.findById(req.params.id);
       if(!evento) return res.status(400).json({ok:false,msg: "evento no existente"});
       if(evento.user.toString()  !== req.uid) return res.status(400).json({ok:false,msg: "no hay permiso"});
       const eventoActualizado ={
           ...req.body,
             user: req.uid
       };
       await eventosModelo.findByIdAndUpdate(evento.id,eventoActualizado,{new:true});
        res.status(200).json({ok:true,msg: "se actualizo el evento"});   
    } catch (error) {
        return res.status(500).json({msg: "error en el servidor"})
    }
 }
 exports.eliminarEvento = async(req = request,res = response)=>{
    try {
       const evento = await eventosModelo.findById(req.params.id)
       if(!evento) return res.status(400).json({ok:false,msg:"usuario no existente"});
      if(evento.user.toString() !== req.uid) return res.status(400).json({ok:false,msg:"no hay permiso"});
      await eventosModelo.findByIdAndDelete(evento.id);
      res.status(200).json({ok:true,msg:"se elimino el evento correctamente"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"error en elo servidor"});    
    }
 }
