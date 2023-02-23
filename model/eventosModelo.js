const mongoose = require("mongoose");
       

const eventosModelo = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    notes:{
        type: String,
        required: true,
        trim: true
    },
    start:{
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        model: "usuarios"
    }
})

eventosModelo.method("toJSON",function(){
    const {__v,_id,...object} =  this.toObject();
    object.id = _id;
    return object;
 });

module.exports = mongoose.model("eventos",eventosModelo);