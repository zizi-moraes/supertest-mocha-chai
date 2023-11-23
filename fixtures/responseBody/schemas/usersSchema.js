const Joi = require("joi")

const schemas = {
  getUser: Joi.object().keys({
    quantidade: Joi.number().integer(),
    usuarios: Joi.array().items(Joi.object().keys({
      nome: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      administrador: Joi.string(),
      _id: Joi.string()
    }))
  }),

  postUser: Joi.object().keys({
    message: Joi.string(),
    _id: Joi.string(),
  }),
}

module.exports = schemas





// exports.userSchema = Joi.object().keys({
//   quantidade: Joi.number().integer(),
//   usuarios: Joi.array().items(Joi.object().keys({
//     nome: Joi.string(),
//     email: Joi.string().email(),
//     password: Joi.string(),
//     administrador: Joi.string(),
//     _id: Joi.string()
//   }))
// })
