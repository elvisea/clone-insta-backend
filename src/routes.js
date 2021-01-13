const express = require('express');
const multer = require('multer');

//Importar Arquivo de Configuração De Uploads
const uploadConfig = require('./config/upload')

//Importar Controllers
const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')

const routes = new express.Router();

//Iniciando o Multer dentro da Variavel upload
const upload = multer(uploadConfig);

//Rota Para Mostrar Posts
routes.get('/posts', PostController.index);
//Rota Para Criar Posts
routes.post('/posts', upload.single('image'),PostController.store);
//Rota Para Dar Like
routes.post('/posts/:id/like', LikeController.store);

//Exportar Rotas
module.exports = routes;

