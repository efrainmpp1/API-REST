const jwt = require('jsonwebtoken');
const SECRET = 'testestoken'; //Futuramente será feito um .env para essas ocasiões 

//Verificando se o usuario tem permissão de acessar a rota
const authenticateUser = (req , res , next) => {
  const token = req.headers['x-access-token'];
  jwt.verify(token , SECRET , (err , decoded) =>{
    if(err){
      return res.status(401).json({
        erro: true,
        mensagem: "Usuario Não Autorizado"
      })
    }
    req.id = decoded.id;
    next();
  })
};

module.exports = authenticateUser;