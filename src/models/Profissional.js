const Sequelize = require('sequelize');

//importando nosso db para trabalhar nosso model
const db = require('../database/index');

//Definindo nosso modelo de usuario definindo seus atributos

const Profissional = db.define('tbl_profissionais', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING , 
    allowNull : false,
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false,
    validate :{
      isEmail: true
    },
    unique: true,
  },
  username:{
    type:  Sequelize.STRING,
    allowNull : false,
    unique : true,
  },
  password:{
    type: Sequelize.STRING,
    allowNull:false,
  },
  telefone:{
    type: Sequelize.STRING,
    unique: true,
    allowNull:false,
  },
  uf:{
    type:Sequelize.CHAR(2),
    allowNull: false,
  },
  cep:{
    type:Sequelize.STRING,
    allowNull: false,
  },
  data_nascimento:{
    type:Sequelize.DATE,
    allowNull: false,
  },
  formacao_profissional:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  pacientes: {
    type:Sequelize.ARRAY(Sequelize.DataTypes.STRING),
  },
});

//Realizar alteração da tabela ja esxistente
//User.sync();

//Buscar futuramente formas de fazer migrations

module.exports = Profissional;