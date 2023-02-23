const { conectarDB } = require("../db/conectedDB");

class App{
    constructor(){
        this.express = require("express");
        this.app = this.express();
        this.path = require("path");
        require("dotenv").config();
    }
    controllers(){
        this.app.set("port",process.env.PORT);
    }
   middlewares(){
       this.app.use(this.express.json());
       this.app.use(this.express.urlencoded({extended: false}));
       this.app.use("/",this.express.static(this.path.join(__dirname,"../public")));
   }

   connectDB(){
     conectarDB();
   }
   rutas(){
       this.app.use("/api/auth",require("../router/AuthRoutes"))
       this.app.use("/api/events", require("../router/EventsRoutes"))
   }
   listen(){
       this.app.listen(this.app.get("port"),()=>{
           console.log(`server in port ${this.app.get("port")}`);
       })
   }
}


module.exports = App;