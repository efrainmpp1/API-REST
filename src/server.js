const express = require('express');
const routes = require('./routes'); // Importando nossas rotas 

const app = express();

app.use(express.json());
app.use(routes); //usando nossas rotas



app.listen(3000 , () => {
  console.log("Server is Listen")
})