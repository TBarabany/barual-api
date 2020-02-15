const nodemailer = require('nodemailer')

const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{ user, pass }
})

module.exports.sendValidateEmail = (property, name, email, phone, message) => {
  transporter.sendMail({
    from: "Interest in property 👻",
    to: user,
    subject: "Interest in property",
    html: `
      <h1>Someone has an interest</h1>
      <p>property ID: ${property}</p> 
      <p>Name: ${name}</p> 
      <p>email: ${email}</p> 
      <p>phone: ${phone}</p> 
      <p>message: ${message}</p> 
    `
  })
    .then(info => console.log(info))
    .catch(error => console.log(error))
}

//Incluir el link a la propiedad como parte del email 