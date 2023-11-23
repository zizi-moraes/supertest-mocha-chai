
const response = function (message) {
  return {
    message: message
  }
}

module.exports = {
  login: {
    invalidEmail: response('Email e/ou senha inválidos'),
    emptyEmail: response('Email não pode ficar em branco'),
    nullEmail: response('Email deve ser uma string'),
    requiredEmail: response('email é obrigatório'),

    invalidPassword: response('Email e/ou senha inválidos'),
    emptyPassword: response('password não pode ficar em branco'),
    nullPassword: response('password deve ser uma string'),
    requiredPassword: response('password é obrigatório'),
  }
}
