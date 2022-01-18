const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

connection.authenticate()
.then(function(){
  console.log("Conexão com DB realizada com Sucesso");
}).catch(function(){
  console.log("A conexão com o DB não pode ser realizada");
});

module.exports = connection;