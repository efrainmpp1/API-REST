const {v4} = require('uuid');
const {hash , compare} = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'testestoken'; //Futuramente será feito um .env para essas ocasiões

const Profissional = require('../models/Profissional');
const ProfissionalServices = require('../services/ProfissionalServices');

class ProfissionalController {
  //Aqui estarão os controladores que comandam nosso CRUD

  async read(req, res) {
    const users = await Profissional.findAll();
    return res.json(users);
  };
}

module.exports = new ProfissionalController;