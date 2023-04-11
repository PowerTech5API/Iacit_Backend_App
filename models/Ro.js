var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RosSchema = new Schema({
    orgao :  { type: String, required: false} , 
    dataRegistro :  { type: String, required: false} ,
    horaRegistro :  { type: String, required: false} , 
    nomeRelator :  { type: String, required: false} ,
    nomeresponsavel :  { type: String, required: false} ,
    nomeColaborador :  { type: String, required: false} , 
    defeito :  { type: String, required: false} , 
    // hardware :{
    //     equipamento :  { type: String, required: false} , 
    //     posicao :  { type: String, required: false} , 
    //     partnumber :  { type: String, required: false} , 
    //     serialNumber :  { type: String, required: false} , 
    //    },
    // software : {
    //     versaoBD :  { type: String, required: false} ,
    //     versaoSoftware :  { type: String, required: false} , 
    //     LogsRO :  { type: String, required: false}, 
    //    },
   
    titulo :  { type: String, required: false} , 
    descricao :  { type: String, required: false} , 
    resolucao :  { type: String, required: false} ,   
       
   
   
   
   
    status :  { type: String, required: false} ,
    categoria :  { type: String, required: false} ,
    
   
     
} ,{timestamps:true}
);
const Ros = mongoose.model("Ros", RosSchema);

module.exports = {
    Ros,
    RosSchema,
}
