//importando nosso User que foi contruido em models
const User = require('../models/User');
const UserServices = require('../services/UserService');

class UserController {

  //Aqui estarão os controladores que comandam nosso CRUD

  async read(req, res) {
    const users = await User.find();
    return res.json(users);
  };
  
};

module.exports = new UserController;