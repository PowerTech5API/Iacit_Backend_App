const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// função para fazer o login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    // encontrar o usuário pelo email
    const user = await User.findOne({ email });

    // se o usuário não existir
    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    // comparar a senha enviada pelo usuário com a senha criptografada no banco
    const isMatch = await bcrypt.compare(password, user.password);

    // se as senhas não coincidirem
    if (!isMatch) {
      return res.status(401).send('Senha incorreta');
    }

    // criar o token com o ID do usuário e uma chave secreta
    const token = jwt.sign({ userId: user._id }, 'chave-secreta');

    // retornar o token
    res.send({ token });

  } catch (err) {
    console.error(err);
    res.status(500).send('Erro interno do servidor');
  }
}

module.exports = { login };