const { termsController } = require('../models/terms');
const { Config: ConfigModel } = require("../models/Config");
const { User: UserModel } = require("../models/User");
const moment = require('moment');

const createTerm = async (req, res) => {
    try {
        const { version, content, topics } = req.body;

        const createdTopics = await Promise.all(
            topics.map(async (topic) => {
                const createdSubtopics = await Promise.all(
                    topic.subtopics.map(async (subtopic) => {
                        const createdSubtopic = {
                            title: subtopic.title,
                            content: subtopic.content,
                            subtopics: subtopic.subtopics ? await createSubtopics(subtopic.subtopics) : [],
                        };
                        return createdSubtopic;
                    })
                );

                const createdTopic = {
                    title: topic.title,
                    content: topic.content,
                    subtopics: createdSubtopics,
                };

                return createdTopic;
            })
            // Define as configurações dos usuários como false

        );

        const createdTerm = await termsController
            .create({
                version,
                content,
                topics: createdTopics,
            });

        await resetConfigurations();
        res.status(201).json(createdTerm);
        // feito isso é preciso pegar chamar a função de criar config, para registrar as alteaçõres
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating term', error });
    }
};

const createSubtopics = async (subtopics) => {
    const createdSubtopics = await Promise.all(
        subtopics.map(async (subtopic) => {
            const createdSubtopic = {
                title: subtopic.title,
                content: subtopic.content,
                subtopics: subtopic.subtopics ? await createSubtopics(subtopic.subtopics) : [],
            };
            return createdSubtopic;
        })
    );
    return createdSubtopics;
};

const getTermByVersion = async (req, res) => {
    try {
        const { version } = req.params;
        const term = await termsController.findOne({ version });
        if (!term) {
            return res.status(404).send('Termo não encontrado');
        }
        res.json(term);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar termo por versão');
    }
};

const getAllTerms = async (req, res) => {
    try {
        const terms = await termsController.find();
        res.json(terms);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar todos os termos');
    }
}

const resetConfigurations = async (req, res) => {
    try {
      const users = await UserModel.find({});
      const createdConfigs = await Promise.all(
        users.map(async (user) => {
          const lastTerm = await termsController.findOne({}, { version: 1 }).sort({ version: -1 });
          const config = new ConfigModel({
            userId: user._id,
            termsAccepted: false,
            termsVersion: lastTerm.version,
            acceptedAt: moment().toDate(),
            receiveEmails: false,
          });
          return config.save();
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao resetar', error });
    }
  };


module.exports = {
    createTerm,
    getTermByVersion,
    getAllTerms
};
