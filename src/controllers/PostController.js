//Importar Model De Post
const Post = require('../models/Post');
//Manipular Imagens
const sharp = require('sharp')
//Manipular Diretórios
const path = require('path')
//Manipular Arquivos
const fs = require('fs')

//Exportar Objeto Com Metodos do Controller

module.exports = {
    //Retorna todos os posts de maneira decrescente 
    async index(req, res){
        const posts = await Post.find().sort('-createdAt')
        return res.json(posts);
    },
    //Criar Posts
    async store(req, res){
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        //Mudar Arquivo Para JPG
        const[name] = image.split('.');
        const fileName = `${name}.jpg`;

        //Redimensionar Arquivo De Imagem
        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

            //Apagar Arquivo Não Redimensionado
            fs.unlinkSync(req.file.path)

        //Salva dentro do banco de dados
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName
        })
        
        //Envia informação em tempo real
        req.io.emit('post', post);
        
        return res.json(post);
    }
};