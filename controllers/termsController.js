const { termsController } = require('../models/terms');

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
        );

        const createdTerm = await termsController
            .create({
                version,
                content,
                topics: createdTopics,
            });

        res.status(201).json(createdTerm);
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



module.exports = {
    createTerm,
    getTermByVersion,
    getAllTerms
};
