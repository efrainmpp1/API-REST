const express = require('express');
const UserController = require('./controllers/userController');

const routes = express.Router();


routes.get('/' , (req,res) => {
  return res.json({StatusServer : "O teste Deu Bom"})
});

//Definindo as rotas do nosso CRUD

routes.get('/users', UserController.read);

/*
routes.get('/users/:id',);

routes.post('/users',);

routes.put('/users/:id' ,);

routes.delete('/users/:id' ,);

*/

module.exports = routes;