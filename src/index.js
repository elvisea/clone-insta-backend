//Importação das Bibliotecas
const express = require('express');
const mongoose = require('mongoose')
//Manipular Diretórios
const path = require('path')
//Permitir Q O BackEnd Fique Acessivel
const cors = require('cors') 
 
//Iniciar Aplicação
const app = express();

                //Divisão do Sevidor para suporte http e websocket

//Aceitar conexões http
const server = require('http').Server(app);
//Aceitar conexões websocket
const io = require('socket.io')(server);

app.use((req, res, next) => {
    req.io = io;
    next();
})

mongoose.connect('mongodb+srv://USER:SENHA@cluster0-5gprb.mongodb.net/test?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
})

//Permitir Q Qualquer Aplicação Acesse o BackEnd
app.use(cors());

//Rotas Para Acessar Imagens
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))); 

//Caminho para as rotas
app.use(require('./routes'))

//Ouvir porta 3333
server.listen(3333);
