const moment = require("moment");


exports.isDate = (value,rest)=>{
 

    if(!value){
        return false;
    }

    const fecha = moment(value);

    if(fecha.isValid()){
        return true;
    }else{
        return false;
    }
}



