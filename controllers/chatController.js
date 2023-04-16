const { Chat: ChatModel } = require("../models/Chat");
const { User: UserModel } = require("../models/User");

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
            const { chatId } = req.params;
            const { senderId, content } = req.body;

            const chat = await ChatModel.findById(chatId);
            if (!chat) {
                return res.status(404).json({ error: "Chat não encontrado." });
            }

            chat.messages.push({ sender: senderId, content: content });
            await chat.save();

            res.json(chat);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Falha ao enviar mensagem." });
        }
    },

    getAllByRO: async (req, res) => {
        try {
            const { roId } = req.params;
            const roChats = await ChatModel.findById(roId);
            console.log(roId)
            console.log(roChats)

            res.json(roChats);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Falha ao encontrar o chat." });
        }
    },

    getAll: async (req, res) => {
        try {
            const chats = await ChatModel.find({}, { _id: 1, roId: 1, users: 1 }).populate("users", { _id: 0, idUser: '$_id', name: 1 }).populate("ro", { idRo: '$_id' });

            res.json(chats);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },

    getById: async (req, res) => {
        try {
            const chat = await ChatModel.findById(req.params.chatId)
                .populate("users", { _id: 0, idUser: '$_id', name: 1 });
            if (!chat) {
                return res.status(404).send("Chat não encontrado ");
            }
            res.json(chat);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = chatController;