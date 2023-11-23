const concat = require('concat-stream')
const joiMachine = require('joi-machine')

// USO:
// 1. Colocar o Response.body em data.json
// 2. Rodar 'npm run convert'
// 3. copiar no console.log a estrutura gerada

const generator = joiMachine.obj()
let structure = generator.pipe(concat({ encoding: 'string' }))
generator.write(require('./data.json'))
structure = structure.body.join('')
console.log('---------INICIO---------')
console.log(structure.split(',').join(', \n'))
console.log('---------FIM---------')
generator.end()
