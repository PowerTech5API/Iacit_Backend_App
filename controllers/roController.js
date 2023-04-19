
const { Ros: RoModel } = require("../models/Ro");

const roController = {

    getAll: async (req, res) => {
        try {
            const ros = await RoModel.find(); 

            res.json(ros);
        }
        catch (error) {
            console.log(error)
        }
    
    },
    create :async (req, res) => {
        try{
            var ros = new RoModel();
           
            ros.orgao = req.body.orgao;
            ros.dataRegistro = req.body.dataRegistro;
            ros.horaRegistro =  req.body.horaRegistro; 
            ros.nomeRelator =  req.body.nomeRelator ;
            ros.nomeresponsavel =  req.body.nomeresponsavel;
            ros.nomeColaborador =  req.body.nomeColaborador;
            ros.defeito =  req.body.defeito;
            ros.hardware= {
                equipamento : req.body.hardware.equipamento,
                posicao : req.body.hardware.posicao,
                partnumber : req.body.hardware.partnumber,
                serialNumber :  req.body.hardware.serialNumber, 
            }
            ros.software={
                versaoBD :req.body.software.versaoBD,
                versaoSoftware :req.body.software.versaoSoftware,
                LogsRO :req.body.software.LogsRO,

            }
            ros.titulo =  req.body.titulo
            ros.descricao =  req.body.descricao
            ros.resolucao =  req.body.resolucao
            ros.status =  req.body.status
            ros.categoria =  req.body.categoria

            const response = await RoModel.create(ros);
            res.json(ros);
            console.log("errasdasdasdasdor");

            

    }

    
    catch (error) {
        console.log(error)
    }


    
    },
    update :async (req, res) => {
        try {


            var ros = new RoModel();
            
            ros.orgao = req.body.orgao;
            ros.dataRegistro = req.body.dataRegistro;
            ros.horaRegistro =  req.body.horaRegistro; 
            ros.nomeRelator =  req.body.nomeRelator ;
            ros.nomeresponsavel =  req.body.nomeresponsavel;
            ros.nomeColaborador =  req.body.nomeColaborador;
            ros.defeito =  req.body.defeito;
            ros.hardware= {
                equipamento : req.body.hardware.equipamento,
                posicao : req.body.hardware.posicao,
                partnumber : req.body.hardware.partnumber,
                serialNumber :  req.body.hardware.serialNumber, 
            }
            ros.software={
                versaoBD :req.body.software.versaoBD,
                versaoSoftware :req.body.software.versaoSoftware,
                LogsRO :req.body.software.LogsRO,

            }
            ros.titulo =  req.body.titulo
            ros.descricao =  req.body.descricao
            ros.resolucao =  req.body.resolucao
            ros.status =  req.body.status
            ros.categoria =  req.body.categoria

            if (!ros._id) {
                res.status(400).json({ msg: "Informe o id do usuário!" })
            }

            const filter = { _id: req.body._id};
            const update = { 
                
                orgao: req.body.orgao,
                dataRegistro : req.body.dataRegistro,
                horaRegistro :  req.body.horaRegistro, 
                nomeRelator :  req.body.nomeRelator ,
                nomeresponsavel :  req.body.nomeresponsavel,
                nomeColaborador :  req.body.nomeColaborador,
                defeito :  req.body.defeito,
                hardware: {
                equipamento : req.body.hardware.equipamento,
                posicao : req.body.hardware.posicao,
                partnumber : req.body.hardware.partnumber,
                serialNumber :  req.body.hardware.serialNumber, 
                },
                software:{
                versaoBD :req.body.software.versaoBD,
                versaoSoftware :req.body.software.versaoSoftware,
                LogsRO :req.body.software.LogsRO,
                            },
                titulo :  req.body.titulo,
                descricao :  req.body.descricao,
                resolucao :  req.body.resolucao,
                status :  req.body.status,
                categoria : req.body.categoria,
            };

            console.log(ros)
            const response = await RoModel.findByIdAndUpdate(filter,update);
            res.json(ros);

    }
    catch (error) {
        console.log(error)
    }
    
    },
    getById :async (req, res) => {
        try {
            const id = req.params.id;
            const ros = await RoModel.findById(id); 
            res.json(ros)



        }
        catch (error) {
            console.log(error)
        }
    },
    delete :async (req, res) => {
        try {
            const id = req.params.id;
            const ro = await RoModel.findById(id); 
            if (!ro) {
                res.status(404).json({ msg: "Usuário não encontrado" })
            }

            const ros = await RoModel.findOneAndDelete(id); 
            res.status(200).json({ msg: "Usuário deletado com sucesso" })


        }
        catch (error) {
            console.log(error)
        }
    },
    getByStatus :async (req, res) => {
        try {
            const status = req.params.status;
            const ros = await RoModel.find({ status: status }); 
            console.log(ros)
            if (!ros){

                res.json("vazio")

            }
            res.json(ros)

        }
        catch (error) {
            console.log(error)
        }
    }
    
}
    module.exports = roController;