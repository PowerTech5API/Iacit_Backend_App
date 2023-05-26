const { Chat: ChatModel } = require("../models/Chat");
const { User: UserModel } = require("../models/User");
const moment = require('moment');

const chatController = {
    //  No momentos está incluindo todos usuários, precisa fazer elação usuario RO
    createNew: async (req, res) => {
        try {
            const { roId, users } = req.body;
            const userRefs = [];

            for (const el of users) {
                const user = await UserModel.findOne({ _id: el });
                if (user) {
                    userRefs.push(user._id);
                } else {
                    res.status(500).json({ error: "Id do usuário " + el + " não existe" });
                    return;
                }
            }
  

            const newChat = new ChatModel({
                ro: roId,
                users: userRefs,
                messages: []
            });

            await newChat.save();

            res.status(201).json(newChat);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao criar o chat." });
        }
    }
    ,

    addMessage: async (req, res) => {
        try {
            const { senderId, chatId, content } = req.body;

            if (!content) {
                return res.status(400).json({ error: "Mensagem vazia" });
            }

            const chat = await ChatModel.findById(chatId);
            if (!chat) {
                return res.status(404).json({ error: "Chat não encontrado." });
            }

            const sender = await UserModel.findById(senderId);
            if (!sender) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            chat.messages.push({ sender: sender._id, content, senderName: sender.name });
            await chat.save();

            res.json({ msg: "Mensagem enviada" });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Falha ao enviar mensagem." });
        }
    },

    getAllByRO: async (req, res) => {
        try {
            const { roId } = req.params;
            const messageCount = parseInt(req.query.messageCount); // Obtém o valor do parâmetro opcional 'messageCount' como um número inteiro

            const chat = await ChatModel.findById(roId)
                .populate({
                    path: 'messages',
                    select: 'content sender timestamp',
                    populate: {
                        path: 'sender',
                        select: 'name idUser',
                    },
                })
                .lean();

            chat.messages = chat.messages.map((message) => {
                if (message.sender) {
                    console.log(message.sender)
                    message.senderName = message.sender.name; // Adiciona a propriedade senderName com o nome do remetente
                }

                message.day = moment(message.timestamp).format('DD/MM/YYYY');
                message.hour = moment(message.timestamp).format('HH:mm');
                delete message.sender
                delete message.timestamp;
                return message;
            });
            if (messageCount && chat.messages.length > messageCount) {
                chat.messages = chat.messages.slice(-messageCount);
            }
            res.json(roChats);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Falha ao encontrar o chat." });
        }
    },

    getAll: async (req, res) => {
        try {
            const chats = await ChatModel.find({}, { _id: 1, roId: 1, users: 1 })
            // .populate("users", { _id: 0, idUser: '$_id', name: 1 }).populate("ro", { idRo: '$_id' });

            res.json(chats);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },

    getById: async (req, res) => {
        try {
            const chatId = req.params.chatId;
            const messageCount = parseInt(req.query.messageCount); // Obtém o valor do parâmetro opcional 'messageCount' como um número inteiro
            const chat = await ChatModel.findById(chatId)
                .populate({
                    path: 'messages',
                    select: 'content sender timestamp',
                    populate: {
                        path: 'sender',
                        select: 'name idUser',
                    },
                })
                .lean();
            chat.messages.sort(chat.messages.timestamp)

            chat.messages = chat.messages.map((message, index) => {

                if (message.sender) {
                    message.senderName = message.sender.name; // Adiciona a propriedade senderName com o nome do remetente
                }
                message.day = moment(message.timestamp).format('DD/MM/YYYY');
                message.hour = moment(message.timestamp).format('HH:mm');
                delete message.sender;
                delete message.timestamp;
                return message;
            });

            if (messageCount && chat.messages.length > messageCount) {
                chat.messages = chat.messages.slice(-messageCount);
            }

            res.json(chat);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },


    deleteChat: async (req, res) => {
        try {
            const { chatId } = req.params;
            const chat = await ChatModel.findById(chatId);

            if (!chat) {
                return res.status(404).json({ error: "Chat não encontrado." });
            }
            await chat.deleteOne();
            res.json({ msg: "Chat deletado." });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Falha ao deletar chat." });
        }
    },
    sendEmail: async (req, res) => {

        try {
            const users = await UserModel.aggregate([
                // Faz um lookup na collection de configs, trazendo apenas a última config de cada usuário
                {
                    $lookup: {
                        from: "configs",
                        let: { userId: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$userId", "$$userId"] } } },
                            { $sort: { acceptedAt: -1 } },
                            { $limit: 1 }
                        ],
                        as: "latestConfig"
                    }
                },
                // Faz o unwind da array "latestConfig" para que possa ser usada na próxima etapa da agregação
                { $unwind: { path: "$latestConfig", preserveNullAndEmptyArrays: true } },
                // Filtra os usuários que possuem a última configuração e que receberam o email
                { $match: { "latestConfig.receiveEmails": true } },
                // Projeta apenas os campos "name" e "email"
                { $project: { name: 1, email: 1 } }
            ]);

            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao buscar usuários");
        }
    },

    deleteMessageById: async (req, res) => {
        try {
            const messageId = req.params.messageId;

            const chat = await ChatModel.findOne({ 'messages._id': messageId });

            if (!chat) {
                return res.status(404).json({ error: 'Message not found' });
            }

            chat.messages.pull(messageId);

            await chat.save();

            res.json({ message: 'Message deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }



}

module.exports = chatController;