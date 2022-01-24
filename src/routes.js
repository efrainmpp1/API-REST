const express = require('express');
const UserController = require('./controllers/userController');
const User = require('./models/User');

const routes = express.Router();


routes.get('/' , (req,res) => {
  return res.json({StatusServer : "O teste Deu Bom"})
});

//Definindo as rotas do nosso CRUD de usuarios

routes.get('/users', UserController.read);

routes.get('/users/:id', UserController.readOne);

routes.post('/users', UserController.cadastrarUser);

routes.put('/users/:id' , UserController.updateUser);

routes.delete('/users/:id' ,UserController.deleteUser);

routes.post('/login' , UserController.loginUser);

module.exports = routes;