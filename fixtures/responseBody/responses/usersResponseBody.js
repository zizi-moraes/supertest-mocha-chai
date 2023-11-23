const response = function (message) {
  return {
    message: message
  }
}

module.exports = {
  user: {
    success: response('Cadastro realizado com sucesso'),
    error: response('Este email já está sendo usado'),
    updatedSuccessfully: response('Registro alterado com sucesso'),
  }

}