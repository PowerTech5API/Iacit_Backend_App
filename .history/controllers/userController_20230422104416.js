const { User: UserModel } = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require("dotenv").config()

const loginService = (email) => UserModel.findOne({email: email}).select("+password");
const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400})

const userController = {

    getAll: async (req, res) => {
        try {
            const users = await UserModel.find({})
                // { password: 0 }; // não exibe a senha

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
        try {
            const id = req.params.id
            const user = await UserModel.findById(id)

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
    }
        
}

module.exports = userController;