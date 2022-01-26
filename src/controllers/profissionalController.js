const {v4} = require('uuid');
const {hash , compare} = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'testestoken'; //Futuramente será feito um .env para essas ocasiões

const Profissional = require('../models/Profissional');
const ProfissionalServices = require('../services/ProfissionalServices');

class ProfissionalController {
  //Aqui estarão os controladores que comandam nosso CRUD

  async read(req, res) {
    const profissionais = await Profissional.findAll();
    return res.json(profissionais);
  };

  async readOne(req, res) {
    const profissional = await Profissional.find({where:{id: req.params.id}});
    return res.json(profissional); 
  };

  async signUp(req,res){
    //Pelo momento é isso que se pede do profissional
    const {name , email , username , password , telefone , uf , cep ,
       data_nascimento , formacao_profissional} = req.body;
    //gerar id e gerar senha criptografada(Futuramente estarão organizadas em UsersServices)
    const id = v4(); 
    const hashPassword = await hash(password,8);

    await Profissional.create({id , name , email , username , password : hashPassword,
    telefone , uf , cep , data_nascimento , formacao_profissional , pacientes : []})
    .then(()=> {
      return res.json({
        erro: false,
        mensagem : "Profissional cadastrado com sucesso"
      });
    }).catch(() => {
      return res.status(400).json({
        erro : true,
        mensagem : "Erro ao cadastrar o Profissional"
      })
    });
  };

  async update(req, res) {
    const idProfissional  = req.params.id;
    await Profissional.update(req.body, {where: {id: idProfissional}});
    return res.status(201).json({
        status: "Profissional atualizado com sucesso"
    });
  };

  async delete(req , res) {
    const { idProfissional } = req.params.id;
    await Profissional.destroy({
        where: {
            id: idProfissional
        }
    });
    return res.status(200).json({
        status: "Profissional deletado com sucesso"
    });
  };

  async login(req , res){
    const {username , password} = req.body;
    const profissional = await Profissional.findOne({
      atrributes: ['id' , 'username' , 'password'],
      where : {username : username },
    });
    //verificando se o usuarname digitado existe
    if(profissional == null){      return res.json({
        erro : true ,
        mensagem : "Erro: Usuario ou senha incorreto"
      })
    }
    //Comparando senhas para conceder acesso ao usuario
    if(!compare(password , profissional.password)){
      return res.status(401).json({
        erro: true,
        mensagem : "Erro: username ou senha incorreto"
      })
    }
    //Criando nosso token de acesso do usuario (por enquanto expira em 5 min)
    const token = jwt.sign({userID : profissional.id} , SECRET , {expiresIn: 300}); 
    return res.json({ auth : true , token: token});
  }

}

module.exports = new ProfissionalController;