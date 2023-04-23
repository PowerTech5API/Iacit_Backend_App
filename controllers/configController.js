const { Config: ConfigModel } = require("../models/Config");

const moment = require('moment');

const configController = {

    saveConfig: async (req, res) => {
        try {

            const config = new ConfigModel({
                userId: req.body.userId,
                termsAccepted: req.body.termsAccepted,
                termsVersion: "1.0",
                acceptedAt: moment().toDate(),
                receiveEmails: req.body.receiveEmails
            });

            await config.save();

            res.status(201).json(config);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Falha ao salvar as configurações.' });
        }
    },

    getByUserId: async (req, res) => {
        try {
            const userId = req.params.userId;

            const userConfigs = await ConfigModel.find({ user: userId }).sort({ acceptedAt: -1 }).lean();

            const formattedConfigs = userConfigs.map(config => {
                config.day = moment(config.acceptedAt).format("DD/MM/YYYY");
                config.hour = moment(config.acceptedAt).format("HH:mm");
                delete config.acceptedAt;
                delete config.userId;
                delete config.__v;
                return config;
            });

            res.json(formattedConfigs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Falha ao encontrar as configurações." });
        }
      },
}

module.exports = configController;