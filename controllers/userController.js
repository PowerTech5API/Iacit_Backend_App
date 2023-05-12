const { User: UserModel } = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

require("dotenv").config()

const loginService = (email) => UserModel.findOne({email: email}).select("+password");
const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400})

const userController = {

    getAll: async (req, res) => {
        try {
            const users = await UserModel.find({}); // não exibe a senha

            res.json(users);
        }
        catch (error) {
            console.log(error)
        }
    },

    getById: async (req, res) => {
        try {
            const id = req.params.id // pega id pela que é passado pela rota
            const user = await UserModel.findById(id, { password: 0 }); // não exibe a senha

            // tratando erro para caso não encontre o id
            if (!user) {
                res.status(404).json({ msg: "Usuário não encontrado" })
            }

            res.json(user);
        }
        catch (error) {
            console.log(error)
        }
    },

    create: async (req, res) => {
        try {
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: false,
                isSendEmail: true
            }

            const filter = { email: user.email };
            const existingEmail = await UserModel.findOne(filter);
            if (existingEmail) {
                res.status(404).json({ msg: "Esse e-mail já é utilizado!" });
            }
            const response = await UserModel.create(user)

            res.json({ msg: "Usuário criado com sucesso!" })
        }
        catch (error) {
            console.log(error)
        }
    },

    update: async (req, res) => {
        try {
            const user = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                isAdmin: req.body.isAdmin,
                isSendEmail: true
            }

            if (!user.id) {
                res.status(404).json({ msg: "Informe o id do usuário!" })
            }

            const filter = { _id: user.id };
            const update = { name: user.name, email: user.email, isAdmin: user.isAdmin, isSendEmail: user.isSendEmail };

            const response = await UserModel.findOneAndUpdate(filter, update)
            res.json({ msg: "Usuário alterado com sucesso!" })
        }

        catch (error) {
            console.log(error)
        }
    },


    delete: async (req, res) => {


        const mongoDB2URI = 'mongodb+srv://lucca:11@cluster0.tr11zxk.mongodb.net/lgpd?retryWrites=true&w=majority';

        // create a new MongoDB connection
        const db2 = mongoose.createConnection(mongoDB2URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });

        const UserLogSchema = new mongoose.Schema({
            users: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserModel'
            }],
            date: {
                type: Date,
                default: Date.now()
            }
        });

        const UserLogModel = db2.model('UserLogModel', UserLogSchema);


        try {
            const id = req.params.id
            const user = await UserModel.findById(id)

            updatedLog = await UserLogModel.findByIdAndUpdate(
                // ID do modelo UserLogModel a ser atualizado
                '6451195532608351a9b7badb', // substitua pelo ID correto
                // objeto de atualização
                { $push: { users: id } },
                // opções
                { new: true, upsert: true }
              );
              console.log(updatedLog);
            // tratando erro para caso não encontre o id
            if (!user) {
                res.status(404).json({ msg: "Usuário não encontrado" })
            }

            const deletedUser = await UserModel.findByIdAndDelete(id)

            res.status(200).json({ msg: "Usuário deletado com sucesso" })

        }
        catch (error) {
            console.log(error)
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await loginService(email);

        if (!user) {
            return res.status(404).send({ message: "Usuário não existe" })
        }

        passwordIsValid = bcrypt.compareSync(password, user.password)

        if (!passwordIsValid) {
            return res.status(400).send({ message: "Senha inválida" })
        }
        const token = generateToken(user.id)
        res.send(token);
    },

    Admin: async (req, res) => {        
        try {
            try {
                const {authorization} = req.headers;

                if(!authorization){
                    return res.send(401);
                }

                const parts = authorization.split(" ");

                if (parts.length !== 2){
                    return res.send(401);
                }

                const [schema, token] = parts;

                if(schema !== "Bearer"){
                    return res.send(401)
                }

                jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
                    if (error){
                        return res.status(401).send({message: "Token Inválido"});
                    } 

                    req.userId = decoded.id;
                });                

            } catch (err){
                res.status(500).send(err.message);
            }

            const id = req.userId;
            const user = await UserModel.findById(id, { password: 0 }); 

            if (!user) {
                res.status(404).json({ msg: "Usuário não encontrado" })
            }

            res.send(user);
        }
        catch (error) {
            console.log(error)
        }
    },
        
}

module.exports = userController;