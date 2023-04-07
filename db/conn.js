const mongoose = require("mongoose")

async function main() {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect("mongodb+srv://powertechfatec2:BvIFSBKvzuRA05oM@cluster0.gcvjnlu.mongodb.net/?retryWrites=true&w=majority")
        console.log("Conectado ao banco!");
    }
    catch (err) {
        console.log("Erro: " + err)
    }
}

module.exports = main;