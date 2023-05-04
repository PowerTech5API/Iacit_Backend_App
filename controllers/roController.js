const { Ros: RoModel } = require("../models/Ro");
const userController = require("../controllers/userController");


const jwt = require('jsonwebtoken')
require("dotenv").config()

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
            }
            ros.software = {
                versaoBD: req.body.software.versaoBD,
                versaoSoftware: req.body.software.versaoSoftware,
                LogsRO: req.body.software.LogsRO,

            }
            ros.titulo = req.body.titulo
            ros.descricao = req.body.descricao
            ros.resolucao = req.body.resolucao
            ros.status = req.body.status
            ros.categoria = req.body.categoria
            ros.user = req.userId
            const response = await RoModel.create(ros);
            res.json(ros);
            console.log("RO criado com sucesso!");
        }


        catch (error) {
            console.log(error)
        }



    },
    update: async (req, res) => {
        try {


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
            }
            ros.software = {
                versaoBD: req.body.software.versaoBD,
                versaoSoftware: req.body.software.versaoSoftware,
                LogsRO: req.body.software.LogsRO,

            }
            ros.titulo = req.body.titulo
            ros.descricao = req.body.descricao
            ros.resolucao = req.body.resolucao
            ros.status = req.body.status
            ros.categoria = req.body.categoria

            if (!ros._id) {
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
                hardware: {
                    equipamento: req.body.hardware.equipamento,
                    posicao: req.body.hardware.posicao,
                    partnumber: req.body.hardware.partnumber,
                    serialNumber: req.body.hardware.serialNumber,
                },
                software: {
                    versaoBD: req.body.software.versaoBD,
                    versaoSoftware: req.body.software.versaoSoftware,
                    LogsRO: req.body.software.LogsRO,
                },
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                resolucao: req.body.resolucao,
                status: req.body.status,
                categoria: req.body.categoria,
            };

            console.log(ros)
            const response = await RoModel.findByIdAndUpdate(filter, update);
            res.json(ros);

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
            const { status, userId, orgao, data, hardwareOrSoftware } = req.body;
            const query = {};

            if (status !== undefined) {
                query.status = status;
            }
            if (userId !== undefined) {
                query.user = userId;
            }
            if (orgao !== undefined) {
                query.orgao = orgao;
            }
            if (data !== undefined) {
                query.dataRegistro = data;
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

            const ross = await RoModel.find(query).populate('user');

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
    }

}
module.exports = roController;