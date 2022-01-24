//importando nosso User que foi contruido em models
const User = require('../models/User');
const UserServices = require('../services/UserService');
const {v4} = require('uuid');
const {hash , compare} = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'testestoken'; //Futuramente será feito um .env para essas ocasiões 

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
    const hashPassword = await hash(password,8);
    await User.create({id ,name , email , username , password : hashPassword , telefone , uf  , cep , data_nascimento , ansiedade ,depressao , familiar_ansioso , familiar_depressivo , ajuda_profissional})
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
    const subject = await User.update(req.body, {where: {id: idUser}});
    return res.status(201).json({
        status: "Usuário atualizado com sucesso"
    });
  };

  async deleteUser(req , res) {
    const { idUser } = req.params.id;
    const subject = await User.destroy({
        where: {
            id: idUser
        }
    });
    return res.status(200).json({
        status: "Usuario deletado com sucesso"
    });
  }

  async loginUser(req , res){
    const {username , password} = req.body;
    const user = await User.findOne({
      atrributes: ['id' , 'username' , 'password'],
      where : {username : username },
    });
    //verificando se o usuarname digitado existe
    if(user == null){
      return res.json({
        erro : true ,
        mensagem : "Erro: Usuario ou senha incorreto"
      })
    }
    //Comparando senhas para conceder acesso ao usuario
    if(!compare(password , user.password)){
      return res.status(401).json({
        erro: true,
        mensagem : "Erro: Usuario ou senha incorreto"
      })
    }
    //Criando nosso token de acesso do usuario (por enquanto expira em 5 min)
    const token = jwt.sign({userID : user.id} , SECRET , {expiresIn: 300}); 
    return res.json({ auth : true , token: token});
  }
  
};



module.exports = new UserController;