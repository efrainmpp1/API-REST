const express = require('express');
const UserController = require('./controllers/userController');
const ProfissionalController = require('./controllers/profissionalController');
const authenticateUser = require('./middlewares/auth');
const User = require('./models/User');
const Profissional = require('./models/Profissional');

const routes = express.Router();


routes.get('/',(req,res) => {
  return res.json({StatusServer : "Deu Bom"})
});

//rota de login do usuario
routes.post('/userLogin' , UserController.loginUser);

//Definindo as rotas do nosso CRUD de usuarios

routes.get('/users',  UserController.read); //Restringir depois essa rota

routes.get('/users/:id', authenticateUser , UserController.readOne);

routes.post('/users', UserController.cadastrarUser);

routes.put('/users/:id' , authenticateUser , UserController.updateUser);

routes.delete('/users/:id' , authenticateUser , UserController.deleteUser);

// Definindo as rotas do CRUD das contas dos Profissionais

routes.get('/profissionais' , ProfissionalController.read);

module.exports = routes;