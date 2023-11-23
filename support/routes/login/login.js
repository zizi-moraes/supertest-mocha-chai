require('dotenv').config()
const request = require('supertest')(process.env.URL)
const { report } = require('../../helper.js')

module.exports = {
  postLogin: async ({ _this, requestBody }) => {
    const response = await request
      .post('/login')
      .send(requestBody)

    report(_this, response)
    return response
  }
}
