const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 3000;
app.get('/favicon.ico', (req, res) => res.status(204));

app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(express.json());

// Conexão banco
const conn = require("./db/conn");

conn();

const routes = require("./routes/router");

app.use('/api', routes)


app.listen(port, function () {
    console.log("Servidor rodando na porta " + port);
})

