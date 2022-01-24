# API-REST
Nesse repositório terá os arquivos da API-REST desenvolvida em Node para Aplicativo Mobile MindData.A API terá funcionalidades envolvendo conexão com nosso DB em PostgreSQL, CRUD de usuarios e profissionais e coleta de dados.A API será desenvolvida com NodeJs, e terá uma divisão de camadas de atuação bem definidas.A parte do DataScience ficará para depois e estará sendo desenvolvida em Python, ja que tem muitas ferramentas boas para se trabalhar nessa área.

# Como Rodar o Projeto
- Primeiramente ter o node instalado em sua maquina, e caso não tenha, faça o download por [aqui](https://nodejs.org/en/download/)
- Faça o clone deste repositório em sua maquina com 
```git clone https://github.com/efrainmpp1/API-REST```
- Entre na pasta do repositório com ```cd API-MINDATA```
- Rodar o comando ```npm i```
- Criar um DB no PostgreSQL chamado ```db_app``` que esteja dentro de um server localhost na porta padrão do PostgreSQL que é a 5432 
- Va na pasta ```src\models\``` e nos arquivos, ative a sincronização que por hora estão comentadas, então apagar os // da frente
- Por fim rode ```npm run dev``` para rodar a versão de desenvolvedor que usa o nodemon, ou rode ```npm start``` para rodar só com node