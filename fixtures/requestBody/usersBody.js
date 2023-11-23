
const faker = require('faker-br')

firstname = faker.name.firstName(),
lastname = faker.name.lastName()

module.exports = {
  createUser: function ({
    name = firstname + ' ' + lastname,
    email = (firstname + '.' + lastname + '@qa.com.br').toLocaleLowerCase(),
    password = faker.internet.password(),
    administrator = 'false',

  } = {}) {
    return {
      nome: name,
      email: email,
      password: password,
      administrador: administrator
    }
  },

  updateUser: function ({ name, email, password, administrator } = {}) {
    return {
      nome: name || firstname + ' ' + lastname,
      email: email || (firstname + '.' + lastname + '@qa.com.br').toLocaleLowerCase(),
      password: password || faker.internet.password(),
      administrador: administrator || 'true',
    };
  }


}


