const Joi = require('joi')
const jwt = require('jsonwebtoken');

const generateToken = (payload, secretPassword) => {

  const token = jwt.sign(payload, secretPassword)

  return token
}

const payload = {
  id : 1,
  username : 'usuaria',
  role: 'admin'
}

const secretPassword = 'claveSecreta'

// console.log(generateToken(payload, secretPassword))

// *****************************************
const schema = Joi.object({
  username: Joi.string()
    .min(5)
    .max(20)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  role: Joi.string()
    .required()
})

const validateUserData = (req, res, next) => {

  const { username, password, email, role } = req.body

  const { error, value } = schema.validate({
    username,
    password,
    email,
    role
  })

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  next()
}

const authenticate = (req, res, next) => {

  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }

}

// VERIFICAR QUE NO EXISTA USUARIO EN LA BASE DE DATOS ANTES DE CREAR

module.exports = {
  validateUserData
}