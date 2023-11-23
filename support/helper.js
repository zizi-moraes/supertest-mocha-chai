require('dotenv').config()
const request = require('supertest')(process.env.URL)
const email = process.env.EMAIL
const password = process.env.PASSWORD
const addContext = require('mochawesome/addContext')

// Função para geração de token
exports.generateToken = async () => {
  const response = await request
    .post('/login')
    .set('Content-Type', 'application/json')
    .send({
      email: email,
      password: password
    })
    .expect(200)

  return 'Bearer ' + response.body.access_token
}

// Sempre passar this (contexto) e o response
// Função para retorno de informações da requisição para geração do relatório mais robusto
exports.report = async (context, response) => {
  const prettyPrint = (data) => JSON.stringify(data, undefined, 2)

  addContext(context, `
    Response Status: ${prettyPrint(response.status)} \n
    Response Body: ${prettyPrint(response.body)} \n
    Response Headers: ${prettyPrint(response.headers)} \n
    Response: ${prettyPrint(response)}`)
}
