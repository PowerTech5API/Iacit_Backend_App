const nodemailer = require('nodemailer');

// Função para enviar o e-mail
function enviarSenhaPorEmail(email, senha) {
  // Configurar o transporte de e-mail
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "02f3e0b8950ce5",
      pass: "dd1661e763bce6"
    }
  });

  // Opções do e-mail
  const mailOptions = {
    from: 'lucca14santiago@gmail.com',  // Insira seu e-mail aqui
    to: email,
    subject: 'Recuperação de senha',
    text: `Sua senha é: ${senha}`
  };

  // Enviar e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('E-mail enviado: ' + info.response);
    }
  });
}

module.exports = {
  enviarSenhaPorEmail
};