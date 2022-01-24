//importando nosso User que foi contruido em models
const User = require('../models/User');
const UserServices = require('../services/UserService');
const {v4} = require('uuid');
const {hash} = require('bcrypt');

class UserController {

  //Aqui estarão os controladores que comandam nosso CRUD

  async read(req, res) {
    const users = await User.findAll();
    return res.json(users);
  };

  async readOne(req , res){
    const idUser = req.params.id;
    const user = await User.findOne({where : { id : idUser}});
    //Retorna um statuscode para caso o usuario nao exista
    return user ? res.status(200).json(user) : res.status(204).send();
  }
   
  async cadastrarUser(req, res){
    console.log(req.body);
    const {name , email , username , password , telefone , uf  , cep , data_nascimento , ansiedade ,depressao , familiar_ansioso , familiar_depressivo , ajuda_profissional} = req.body;
    //função de User Service para ver se os dados são validos

    //gerar id e gerar senha criptografada(Futuramente estarão organizadas em UsersServices)
    const id = v4(); 
    const newPassword = await hash(password,8);
    const newUser = await User.create({id ,name , email , username , password : newPassword , telefone , uf  , cep , data_nascimento , ansiedade ,depressao , familiar_ansioso , familiar_depressivo , ajuda_profissional})
    .then(()=> {
      return res.json({
        erro: false,
        mensagem : "Usuario cadastrado com sucesso"
      });
    }).catch(() => {
      return res.status(400).json({
        erro : true,
        mensagem : "Erro ao cadastrar o usuario"
      })
    });
    
  };

  async updateUser(req, res) {
    const idUser  = req.params.id;
    const subject = await SubjectModel.update(req.body, {
        where: {
            id: idUser
        }
    });
    return res.status(201).json({
        status: "Usuário atualizado com sucesso"
    });
  };

  async deleteUser(req , res) {
    const { iidUser } = req.params.id;
    const subject = await SubjectModel.destroy({
        where: {
            id: iidUser
        }
    });
    return res.status(200).json({
        status: "Usuario deletado com sucesso"
    });
  }
  
};



module.exports = new UserController;