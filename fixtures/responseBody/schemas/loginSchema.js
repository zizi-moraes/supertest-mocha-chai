
const Joi = require('joi')

exports.loginSchema = Joi.object().keys({
  message: Joi.string(),
  authorization: Joi.string()
})
