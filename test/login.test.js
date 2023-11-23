
const Joi = require('joi')
const expect = require('chai').expect
const requestBody = require('../fixtures/requestBody/loginBody')
const { postLogin } = require('../support/routes/login/login')
const { loginSchema } = require('../fixtures/responseBody/schemas/loginSchema')
const responseBody = require('../fixtures/responseBody/responses/loginResponseBody')

describe('Login Suíte - Realizar login.', function () {
  it('POST - Login - Realizar login com o perfil administrador', async function () {
    const body = requestBody.login({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD })
    const response = await postLogin({ _this: this, requestBody: body })

    expect(response.status).to.eql(200)
    Joi.assert(response.body, loginSchema)
  })

  it('POST - Login - Validar retorno ao enviar e-mail inválido', async function () {
    const body = requestBody.login({ email: process.env.INVALID_EMAIL, password: process.env.ADMIN_PASSWORD })
    const response = await postLogin({ _this: this, requestBody: body })

    expect(response.status).to.deep.eql(401)
    expect(response.body, responseBody.login.invalidEmail)
  })

  it('POST - Login - Validar retorno ao enviar e-mail em branco', async function () {
    const body = requestBody.login({ email: '', password: process.env.ADMIN_PASSWORD })
    const response = await postLogin({ _this: this, requestBody: body })

    expect(response.status).to.deep.eql(400)
    expect(response.body, responseBody.login.emptyEmail)
  })

  it('POST - Login - Validar retorno ao enviar e-mail nulo', async function () {
    const body = requestBody.login({ email: null, password: process.env.ADMIN_PASSWORD })
    const response = await postLogin({ _this: this, requestBody: body })

    expect(response.status).to.deep.eql(400)
    expect(response.body, responseBody.login.nullEmail)
  })

  it('POST - Login - Validar retorno ao deixar de enviar o campo e-mail', async function () {
    const body = requestBody.login({ password: process.env.ADMIN_PASSWORD })
    delete body.email;
    const response = await postLogin({ _this: this, requestBody: body })

    expect(response.status).to.deep.eql(400)
    expect(response.body, responseBody.login.requiredEmail)
  })

  it('POST - Login - Validar retorno ao enviar senha inválida', async function () {
    const body = requestBody.login({ email: process.env.ADMIN_EMAIL, password: process.env.INVALID_PASSWORD })
    const response = await postLogin({ _this: this, requestBody: body })

    expect(response.status).to.deep.eql(401)
    expect(response.body, responseBody.login.invalidPassword)
  })

  it('POST - Login - Validar retorno ao enviar senha em branco', async function () {
    const body = requestBody.login({ email: process.env.ADMIN_EMAIL, password: '' })
    const response = await postLogin({ _this: this, requestBody: body })

    expect(response.status).to.deep.eql(400)
    expect(response.body, responseBody.login.emptyPassword)
  })

  it('POST - Login - Validar retorno ao enviar senha nulo', async function () {
    const body = requestBody.login({ email: null, password: null })
    const response = await postLogin({ _this: this, requestBody: body })

    expect(response.status).to.deep.eql(400)
    expect(response.body, responseBody.login.nullPassword)
  })

  it('POST - Login - Validar retorno ao deixar de enviar o campo senha', async function () {
    const body = requestBody.login({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD })
    delete body.password;
    const response = await postLogin({ _this: this, requestBody: body })

    expect(response.status).to.deep.eql(400)
    expect(response.body, responseBody.login.requiredPassword)
  })
})
