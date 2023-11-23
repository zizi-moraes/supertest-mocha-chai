
require('dotenv').config()
const request = require('supertest')(process.env.URL)
const { report } = require('../../helper')

module.exports = {

  getUsers: async ({ _this, token, id, name, email, password, administrator }) => {
    const response = await request
      .get('/usuarios')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .query({ _id: id })
      .query({ nome: name })
      .query({ email: email })
      .query({ password: password })
      .query({ administrador: administrator })

    report(_this, response)
    return response
  },

  postUser: async({ _this, token, requestBody }) => {
    const response = await request
      .post('/usuarios')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send(requestBody)

    report(_this, response)
    return response
  }, 

  putUser: async({ _this, token, requestBody, id}) => {
    const response = await request
      .put(`/usuarios/${id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send(requestBody)

    report(_this, response)
    return response
  }

  


}
