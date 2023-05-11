const { Chat: ChatModel } = require("../models/Chat");
const { User: UserModel } = require("../models/User");
const moment = require('moment');

const chatController = {
    //  No momentos está incluindo todos usuários, precisa fazer elação usuario RO
    createNew: async (req, res) => {
        try {
            const { roId } = req.body;
            const roUsers = await UserModel.find({ ro: roId });
            const userRefs = roUsers.map(user => user._id);

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
    },

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
            const roChats = await ChatModel.findById(roId)
                .populate({
                    path: "messages",
                    select: ['content', 'sender', 'timestamp'],
                    populate: {
                        path: 'sender',
                        select: "name"
                    }
                }).lean();

                roChats.messages = roChats.messages.map((message) => {

                    message.day = moment(message.timestamp).format('DD/MM/YYYY');
                    message.hour = moment(message.timestamp).format('HH:mm');
                    delete message.timestamp;
                    return message;
                });

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
            const chat = await ChatModel.findById(req.params.chatId)
                .populate({
                    path: "messages",
                    select: "content sender timestamp",
                    populate: {
                        path: "sender",
                        select: "name idUser",

                    },
                })
                .lean();

            chat.messages = chat.messages.map((message) => {

                message.day = moment(message.timestamp).format('DD/MM/YYYY');
                message.hour = moment(message.timestamp).format('HH:mm');
                delete message.timestamp;
                return message;
            });

            res.json(chat);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }c
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
              { $lookup: {
                from: "configs",
                let: { userId: "$_id" },
                pipeline: [
                  { $match: { $expr: { $eq: [ "$userId", "$$userId" ] } } },
                  { $sort: { acceptedAt: -1 } },
                  { $limit: 1 }
                ],
                as: "latestConfig"
              }},
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
}

module.exports = chatController;