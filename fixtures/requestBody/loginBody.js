module.exports = {
  login: function ({
    email = 'fulano@qa.com',
    password = 'teste'
  } = {}) {
    return {
      email,
      password
    }
  }
}
