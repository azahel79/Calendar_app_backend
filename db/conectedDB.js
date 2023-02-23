const mongoose = require("mongoose");
exports.conectarDB = async()=>{
     try {
        await mongoose.set("strictQuery",true);
         await mongoose.connect(process.env.DB_CNN);
         console.log("se conecto ala base de datos de mongoDB");
      
     } catch (error) {
           console.log(error);
           throw new Error("error al conectar la base de datos");
     }
}