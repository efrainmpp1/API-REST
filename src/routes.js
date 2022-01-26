const express = require('express');

const User = require('./models/User');
const Profissional = require('./models/Profissional');

const UserController = require('./controllers/userController');
const ProfissionalController = require('./controllers/profissionalController');

const authenticateUser = require('./middlewares/auth');

const routes = express.Router();


routes.get('/',(req,res) => {
  return res.json({StatusServer : "Deu Bom"})
});

//Definindo nossas rotas para os usuarios 
routes.post('/userLogin' , UserController.login);//Login do usuario
routes.post('/userSignUp', UserController.cadastrar);//Cadatro de um novo Usuário
routes.get('/users/:id',authenticateUser,UserController.readOne);//Obter dados do user
routes.put('/users/:id',authenticateUser,UserController.update);//Update User
routes.delete('/users/:id',authenticateUser,UserController.delete);//Deletar conta
//routes.get('/users',  UserController.read); //Listar dado de todos os users

// Definindo as rotas para os Profissionais
routes.post('/profissionalLogin' , ProfissionalController.login);//login
routes.post('/userSignUp' , ProfissionalController.signUp); //Cadastro de profissionais
routes.get('/profissionais/:id' , ProfissionalController.readOne);
routes.put('/profissionais/:id' , ProfissionalController.update);
routes.delete('/profissionais/:id' , ProfissionalController.delete);


module.exports = routes;