const { Ros: RoModel } = require("../models/Ro");
const { User: UserModel } = require("../models/User");

const userController = require("../controllers/userController");


const jwt = require('jsonwebtoken')
require("dotenv").config()
const shortid = require('shortid');
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
    create: async (req, res) => {
        try {

            try {
                const { authorization } = req.headers;

                if (!authorization) {
                    return res.send(401);
                }

                const parts = authorization.split(" ");

                if (parts.length !== 2) {
                    return res.send(401);
                }

                const [schema, token] = parts;

                if (schema !== "Bearer") {
                    return res.send(401)
                }

                jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
                    if (error) {
                        return res.status(401).send({ message: "Token Inválido" });
                    }

                    req.userId = decoded.id;
                });

            } catch (err) {
                res.status(500).send(err.message);
            }
            const allowedDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
            const allowedTimeRegex = /^\d{2}:\d{2}$/;
            const allowedNameRegex = /^[a-zA-Z\u00C0-\u017F\s']+$/;
            const allowedDescriptionRegex = /^[a-zA-Z\u00C0-\u017F\s',\p{P}]+$/u;
            
            if (!req.body.orgao.match(allowedNameRegex)) {
              return res.status(400).json({ message: "Campo 'orgao' inválido. Deve conter apenas letras e espaços." });
            }
            if (!req.body.dataRegistro.match(allowedDateRegex)) {
              return res.status(400).json({ message: "Campo 'dataRegistro' inválido. Deve estar no formato DD/MM/AAAA." });
            }
            if (!req.body.horaRegistro.match(allowedTimeRegex)) {
              return res.status(400).json({ message: "Campo 'horaRegistro' inválido. Deve estar no formato HH:MM." });
            }
            if (!req.body.nomeRelator.match(allowedNameRegex)) {
              return res.status(400).json({ message: "Campo 'nomeRelator' inválido. Deve conter apenas letras e espaços." });
            }
            if (!req.body.nomeresponsavel.match(allowedNameRegex)) {
              return res.status(400).json({ message: "Campo 'nomeresponsavel' inválido. Deve conter apenas letras e espaços." });
            }
            if (!req.body.nomeColaborador.match(allowedNameRegex)) {
              return res.status(400).json({ message: "Campo 'nomeColaborador' inválido. Deve conter apenas letras e espaços." });
            }
            if (!req.body.titulo.match(allowedNameRegex)) {
              return res.status(400).json({ message: "Campo 'titulo' inválido. Deve conter apenas letras e espaços." });
            }
            if (!req.body.descricao.match(allowedDescriptionRegex)) {
              return res.status(400).json({ message: "Campo 'descricao' inválido. Deve conter apenas letras e espaços." });
            }
            if (!req.body.status.match(allowedNameRegex)) {
              return res.status(400).json({ message: "Campo 'status' inválido. Deve conter apenas letras e espaços." });
            }
            if (!req.body.categoria.match(allowedNameRegex)) {
              return res.status(400).json({ message: "Campo 'categoria' inválido. Deve conter apenas letras e espaços." });
            }
            if (typeof req.body.defeito !== 'string') {
              return res.status(400).json({ message: "Campo 'defeito' inválido. Deve ser uma string." });
            }
            if (typeof req.body.hardware.equipamento !== 'string') {
              return res.status(400).json({ message: "Campo 'equipamento' do hardware inválido. Deve ser uma string." });
            }
            if (typeof req.body.hardware.posicao !== 'string') {
              return res.status(400).json({ message: "Campo 'posicao' do hardware inválido. Deve ser uma string." });
            }
            if (typeof req.body.hardware.partnumber !== 'string') {
              return res.status(400).json({ message: "Campo 'partnumber' do hardware inválido. Deve ser uma string." });
            }
            if (typeof req.body.hardware.serialNumber !== 'string') {
              return res.status(400).json({ message: "Campo 'serialNumber' do hardware inválido. Deve ser uma string." });
            }
            if (typeof req.body.software.versaoBD !== 'string') {
              return res.status(400).json({ message: "Campo 'versaoBD' do software inválido. Deve ser uma string." });
            }
            if (typeof req.body.software.versaoSoftware !== 'string') {
              return res.status(400).json({ message: "Campo 'versaoSoftware' do software inválido. Deve ser uma string." });
            }
            if (typeof req.body.software.LogsRO !== 'string') {
              return res.status(400).json({ message: "Campo 'LogsRO' do software inválido. Deve ser uma string." });
            }
            if (typeof req.body.resolucao !== 'string') {
              return res.status(400).json({ message: "Campo 'resolucao' inválido. Deve ser uma string." });
            }
            
            const codigo = `RO-${shortid.generate()}`;
            var ros = new RoModel();
            
            ros.orgao = req.body.orgao;
            ros.dataRegistro = req.body.dataRegistro;
            ros.horaRegistro = req.body.horaRegistro;
            ros.nomeRelator = req.body.nomeRelator;
            ros.nomeresponsavel = req.body.nomeresponsavel;
            ros.nomeColaborador = req.body.nomeColaborador;
            ros.defeito = req.body.defeito;
            ros.hardware = {
              equipamento: req.body.hardware.equipamento,
              posicao: req.body.hardware.posicao,
              partnumber: req.body.hardware.partnumber,
              serialNumber: req.body.hardware.serialNumber,
            };
            ros.software = {
              versaoBD: req.body.software.versaoBD,
              versaoSoftware: req.body.software.versaoSoftware,
              LogsRO: req.body.software.LogsRO,
            };
            ros.titulo = req.body.titulo;
            ros.descricao = req.body.descricao;
            ros.resolucao = req.body.resolucao;
            ros.status = req.body.status;
            ros.categoria = req.body.categoria;
            ros.user = req.userId;
            ros.codigo = `#${codigo}`;
            console.log(ros.codigo);
            
            const response = await RoModel.create(ros);
            res.json(ros);
            console.log("RO criado com sucesso!");
          } catch (error) {
            console.log(error);
          }
        



    },
    update: async (req, res) => {
        try {


            var ros = new RoModel();

            if (!req.body._id) {
                res.status(400).json({ msg: "Informe o id da RO!" })
            }

            const filter = { _id: req.body._id };
            const update = {
                orgao: req.body.orgao,
                dataRegistro: req.body.dataRegistro,
                horaRegistro: req.body.horaRegistro,
                nomeRelator: req.body.nomeRelator,
                nomeresponsavel: req.body.nomeresponsavel,
                nomeColaborador: req.body.nomeColaborador,
                defeito: req.body.defeito,
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                resolucao: req.body.resolucao,
                status: req.body.status,
                categoria: req.body.categoria,
            };


            if (req.body.software) {
                if (req.body.software.versaoBD) {
                    update.software.versaoBD = req.body.software.versaoBD;
                }
                if (req.body.software.versaoSoftware) {
                    update.software.versaoSoftware = req.body.software.versaoSoftware;
                }
                if (req.body.software.LogsRO) {
                    update.software.LogsRO = req.body.software.LogsRO;
                }
            }

            if (req.body.hardware) {
                if (req.body.hardware.equipamento) {
                    update.hardware.equipamento = req.body.hardware.equipamento;
                }
                if (req.body.hardware.posicao) {
                    update.hardware.posicao = req.body.hardware.posicao;
                }
                if (req.body.hardware.partnumber) {
                    update.hardware.partnumber = req.body.hardware.partnumber;
                }
                if (req.body.hardware.serialNumber) {
                    update.hardware.serialNumber = req.body.hardware.serialNumber;
                }
            }

            const response = await RoModel.findByIdAndUpdate(filter, update);
            res.json(response);

        }
        catch (error) {
            console.log(error)
        }

    },
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const ros = await RoModel.findById(id);
            res.json(ros)

        }
        catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const ro = await RoModel.findById(id);
            if (!ro) {
                res.status(404).json({ msg: "RO não encontrada" })
            }

            const ros = await RoModel.findOneAndDelete(id);
            res.status(200).json({ msg: "RO deletada com sucesso" })


        }
        catch (error) {
            console.log(error)
        }
    },
    getByStatus: async (req, res) => {
        try {
            const status = req.params.status;
            const ros = await RoModel.find({ status: status });
            if (!ros) {

                res.json("Sem resultados")

            }
            res.json(ros)

        }
        catch (error) {
            console.log(error)
        }
    },
    getAllByUserId: async (req, res) => {
        console.log(req.params.userId)
        try {
            const userId = req.params.userId; // Obtém o ID do usuário a partir dos parâmetros da requisição
            const ros = await RoModel.find({ user: userId }); // Filtra as ROs com base no ID do usuário

            res.json(ros);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao buscar as ROs do usuário' });
        }
    },
    getByUserStatus: async (req, res) => {
        try {
            try {
                const { authorization } = req.headers;

                if (!authorization) {
                    return res.send(401);
                }

                const parts = authorization.split(" ");

                if (parts.length !== 2) {
                    return res.send(401);
                }

                const [schema, token] = parts;

                if (schema !== "Bearer") {
                    return res.send(401)
                }

                jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
                    if (error) {
                        return res.status(401).send({ message: "Token Inválido" });
                    }

                    req.userId = decoded.id;
                });

            } catch (err) {
                res.status(500).send(err.message);
            }

            const status = req.params.status;
            const user = req.userId;
            const ros = await RoModel.find({ status: status, user: user });
            console.log(ros)
            if (!ros) {

                res.json("vazio")

            }
            res.json(ros)

        }
        catch (error) {
            console.log(error)
        }
    },
    getOrgaos: async (req, res) => {
        try {
            const orgaos = await RoModel.distinct("orgao");
            const listOrgaos = []
            orgaos.forEach(element => {
                listOrgaos.push({ nome: element })
            });
            res.json(listOrgaos);
        } catch (error) {
            console.log(error);
        }
    },
    getOrgaos: async (req, res) => {
        try {
            const orgaos = await RoModel.distinct("orgao");
            const listOrgaos = []
            orgaos.forEach(element => {
                listOrgaos.push({ nome: element })
            });
            res.json(listOrgaos);
        } catch (error) {
            console.log(error);
        }
    },
    filterRos: async (req, res) => {
        try {
            const { status, nome, orgao, data, hardwareOrSoftware, dataOrg, nomeRelator, defeito } = req.body;
            let crescentedecrescente = -1

            const query = {};

            if (status !== undefined) {
                query.status = status;
            }
            if (nome !== undefined) {
                const user = await UserModel.findOne({ name: nome }, { password: 0 });
                query.user = user.id;
            }
            if (orgao !== undefined) {
                query.orgao = orgao;
            }
            if (data !== undefined) {
                query.dataRegistro = data;
            }
            if (dataOrg !== undefined) {
                if (dataOrg == "Antigo") {
                    crescentedecrescente = 1;
                }
            }



            if (nomeRelator !== undefined) {
                query.nomeRelator = nomeRelator;
            }


            if (defeito !== undefined) {
                query.defeito = defeito;
            }

            if (hardwareOrSoftware !== undefined) {
                if (hardwareOrSoftware == 0) {
                    query['hardware.equipamento'] = { $exists: true };
                } else if (hardwareOrSoftware == 1) {
                    query['software.versaoBD'] = { $exists: true };
                } else if (hardwareOrSoftware == 2) {
                    query.$or = [
                        { 'hardware.equipamento': { $exists: true } },
                        { 'software.versaoBD': { $exists: true } }
                    ];
                }
            }

            const ross = await RoModel.find(query).populate('user').sort({ createdAt: crescentedecrescente });;

            const result = ross.map((ros) => {
                return {
                    id: ros._id,
                    orgao: ros.orgao,
                    dataRegistro: ros.dataRegistro,
                    horaRegistro: ros.horaRegistro,
                    nomeRelator: ros.nomeRelator,
                    nomeresponsavel: ros.nomeresponsavel,
                    nomeColaborador: ros.nomeColaborador,
                    defeito: ros.defeito,
                    hardware: ros.hardware,
                    software: ros.software,
                    titulo: ros.titulo,
                    descricao: ros.descricao,
                    resolucao: ros.resolucao,
                    status: ros.status,
                    categoria: ros.categoria,
                    createdAt: ros.createdAt,
                    user: ros.user ? { id: ros.user._id, name: ros.user.name } : null,
                };
            });

            if (result.length == 0) {
                res.json({ msg: "Nenhuma RO encontrada com esse filtro" })
            } else {
                res.json(result);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    filterRosUser: async (req, res) => {
        try {
            const { authorization } = req.headers;

            if (!authorization) {
                return res.send(401);
            }
            const parts = authorization.split(" ");

            if (parts.length !== 2) {
                return res.send(401);
            }

            const [schema, token] = parts;

            if (schema !== "Bearer") {
                return res.send(401)
            }

            jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
                if (error) {
                    return res.status(401).send({ message: "Token Inválido" });
                }

                req.userId = decoded.id;
            });

        } catch (err) {
            res.status(500).send(err.message);
        }
        
        try {
            const { status, nome, orgao, data, hardwareOrSoftware, dataOrg, nomeRelator, defeito } = req.body;
            let crescentedecrescente = -1

            const query = {};

            if (status !== undefined) {
                query.status = status;
            }
            if (nome !== undefined) {
                const user = await UserModel.findOne({ name: nome }, { password: 0 });
                query.user = user.id;
            }
            if (orgao !== undefined) {
                query.orgao = orgao;
            }
            if (data !== undefined) {
                query.dataRegistro = data;
            }
            if (dataOrg !== undefined) {
                if (dataOrg == "Antigo") {
                    crescentedecrescente = 1;
                }
            }
          
            query.user=req.userId


            if (nomeRelator !== undefined) {
                query.nomeRelator = nomeRelator;
            }


            if (defeito !== undefined) {
                query.defeito = defeito;
            }

            if (hardwareOrSoftware !== undefined) {
                if (hardwareOrSoftware == 0) {
                    query['hardware.equipamento'] = { $exists: true };
                } else if (hardwareOrSoftware == 1) {
                    query['software.versaoBD'] = { $exists: true };
                } else if (hardwareOrSoftware == 2) {
                    query.$or = [
                        { 'hardware.equipamento': { $exists: true } },
                        { 'software.versaoBD': { $exists: true } }
                    ];
                }
            }
            const ross = await RoModel.find(query).populate('user').sort({ createdAt: crescentedecrescente });;

            const result = ross.map((ros) => {
                return {
                    id: ros._id,
                    orgao: ros.orgao,
                    dataRegistro: ros.dataRegistro,
                    horaRegistro: ros.horaRegistro,
                    nomeRelator: ros.nomeRelator,
                    nomeresponsavel: ros.nomeresponsavel,
                    nomeColaborador: ros.nomeColaborador,
                    defeito: ros.defeito,
                    hardware: ros.hardware,
                    software: ros.software,
                    titulo: ros.titulo,
                    descricao: ros.descricao,
                    resolucao: ros.resolucao,
                    status: ros.status,
                    categoria: ros.categoria,
                    createdAt: ros.createdAt,
                    user: ros.user ? { id: ros.user._id, name: ros.user.name } : null,
                };
            });

            if (result.length == 0) {
                res.json({ msg: "Nenhuma RO encontrada com esse filtro" })
            } else {
                res.json(result);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

}
module.exports = roController;