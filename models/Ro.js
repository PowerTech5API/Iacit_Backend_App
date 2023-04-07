var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RosSchema = new Schema({
    orgao :  String ,
    dataRegistro :  String ,
    horaRegistro :  String ,
    nomeRelator :  String ,
    nomeresponsavel :  String ,
    nomeColaborador :  String ,
    defeito :  String ,
    hardware :{
        equipamento :  String ,
        posicao :  String ,
        partnumber :  String ,
        serialNumber :  String ,	
       },
    software :{
        versaoBD :  String ,
        versaoSoftware :  String ,
        LogsRO :  String 
       },
   
    titulo :  String ,
    descricao :  String ,
    resolucao :  String ,
       
   
   
   
   
    status :  String ,
    categoria :  String ,
    
   
     
} ,{timestamps:true}
);
const Ros = mongoose.model("Ros", RosSchema);

module.exports = {
    Ros,
    RosSchema,
}
