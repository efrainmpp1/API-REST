const Sequelize = require('sequelize');

//importando nosso db para trabalhar nosso model
const db = require('../database/index');

//Definindo nosso modelo de usuario definindo seus atributos
const User = db.define( 'tbl_pacientes' , {
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
  ansiedade:{
    type: Sequelize.BOOLEAN,
    allowNull:false,
  },
  depressao:{
    type:Sequelize.BOOLEAN,
    allowNull:false,
  },
  familiar_Ansioso:{
    type:Sequelize.BOOLEAN,
    allowNull:false,
  },
  familiar_Depressivo :{
    type:Sequelize.BOOLEAN,
    allowNull:false,
  },
  ajuda_profissional:{
    type: Sequelize.STRING,
  },
});

//Realizar alteração da tabela ja esxistente
//User.sync();

//Buscar futuramente formas de fazer migrations

module.exports = User;