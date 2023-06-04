const nodemailer = require('nodemailer');

// Função para enviar o e-mail
function enviarSenhaPorEmail(email, senha) {
  // Configurar o transporte de e-mail
  var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: "PowerTech123@outlook.com.br",
      pass: "qwer1234!@#$"
    }
  });
  console.log(email,senha)
  // Opções do e-mail
  const mailOptions = {
    from: 'PowerTech123@outlook.com.br',
    to: email,
    subject: 'Recuperação de senha',
    text: `Sua nova senha é: ${senha}`
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