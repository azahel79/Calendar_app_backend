const mongoose = require("mongoose");


const usuarioModelo =  new  mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true  
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})


module.exports = mongoose.model("Usuarios",usuarioModelo);