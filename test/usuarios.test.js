
const Joi = require('joi')
const expect = require('chai').expect
const faker = require('faker-br')
const { generateToken } = require('../support/helper')
const { getUsers, postUser, putUser } = require("../support/routes/users/users")
const requestBody = require('../fixtures/requestBody/usersBody')
const usersResponseBody = require('../fixtures/responseBody/responses/usersResponseBody')
const schemas = require('../fixtures/responseBody/schemas/usersSchema')


describe('User CRUD Suíte - GET Usuários', function () {

  it('GET - Listar todos usuários', async function () {
    const response = await getUsers({ _this: this, token: generateToken() })

    expect(response.status).to.eql(200)
    Joi.assert(response.body, schemas.getUser)
  })

  it('GET - Listar Usuários - Filtrando por nome', async function () {
    const response = await getUsers({ _this: this, token: generateToken(), name: "Maria Moraes" })

    expect(response.status).to.eql(200)
  })

  it('GET - Listar Usuários - Filtrando por email', async function () {
    const response = await getUsers({ _this: this, token: generateToken(), email: "maria.moraes@qa.com.br" })

    expect(response.status).to.eql(200)
  })

  it('GET - Listar Usuários - Filtrando por password', async function () {
    const response = await getUsers({ _this: this, token: generateToken(), password: "teste" })

    expect(response.status).to.eql(200)
  })

  it('GET - Listar Usuários - Filtrando por administrador', async function () {
    const response = await getUsers({ _this: this, token: generateToken(), administrator: true })

    expect(response.status).to.eql(200)
  })

  it('GET - Listar Usuários - Filtrando por usuário diferente de administrador', async function () {
    const response = await getUsers({ _this: this, token: generateToken(), administrator: false })

    expect(response.status).to.eql(200)
  })

  it('GET - Listar Usuários - Filtrando por nome e administrador', async function () {
    const response = await getUsers({ _this: this, token: generateToken(), name: "Maria", administrator: true })

    expect(response.status).to.eql(200)
  })
})



describe('User CRUD Suíte - POST Usuários', function () {

  it('POST - Cadastrar Novo Usuário', async function () {
    const body = requestBody.createUser()
    const response = await postUser({ _this: this, token: generateToken(), requestBody: body })

    Joi.assert(response.body, schemas.postUser)
    expect(response.status).to.eql(201)
    expect(response.body, usersResponseBody.user.success)
  })

  it('Cadastrar usuário com email em uso', async function () {
    const body = requestBody.createUser({ email: 'fulano@qa.com' })
    const response = await postUser({ _this: this, token: generateToken(), requestBody: body })

    expect(response.status).to.eql(400)
    expect(response.body, usersResponseBody.user.error)
  })




  describe('User CRUD Suíte - PUT Usuários', function () {

    it.skip('PUT - Editar Usuários', async function () {
      const getResponse = await getUsers({ _this: this, token: generateToken() })
      const id = getResponse.body.usuarios[2]._id

      expect(getResponse.status).to.eq(200)


      const firstname = faker.name.firstName()
      const lastname = faker.name.lastName()
      const name = firstname + ' ' + lastname
      const email = (firstname + '.' + lastname + '@qa.com.br').toLocaleLowerCase()

      const body = requestBody.updateUser({ name: name, email: email })
      const response = await putUser({ _this: this, token: generateToken(), id: id, requestBody: body })

      expect(response.status).to.eq(200)
      expect(response.body, usersResponseBody.user.updatedSuccessfully)
    })


    it('PUT - Informar ID inexistente. Caso não seja encontrado usuário com o id informado, é realizado novo cadastro ao invés de alteração', async function () {
      const body = requestBody.updateUser()
      const response = await putUser({ _this: this, token: generateToken(), id: 'invalidIdx', requestBody: body })

      Joi.assert(response.body, schemas.postUser)
      expect(response.status).to.eql(400)
      expect(response.body, usersResponseBody.user.success)
    })


    it.skip('PUT - Informar ID Inexistente, porém com email existente.', async function () {

      const getResponse = await getUsers({ _this: this, token: generateToken() })
      const existingEmail = getResponse.body.usuarios[3].email

      expect(getResponse.status).to.eq(200)


      const body = requestBody.updateUser({ email: existingEmail })
      const response = await putUser({ _this: this, token: generateToken(), id: 'invalidIdx', requestBody: body })

      expect(response.status).to.eql(400)
      expect(response.body, usersResponseBody.user.success)
    })

  })







})

