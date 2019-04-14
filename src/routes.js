const express = require ('express');
const multer = require ('multer');
const multerConfig = require ('./config/multer');

const routes = express.Router();

const BoxController = require ('./controllers/BoxControllers');
const FileController = require ('./controllers/FileController');
/*//req(requisicao) representa a requisição feita ao nosso servidor, dentro dele à informações relacionadas a requisição
//ex: se o nosso front-end está enviando um form, dentro da requisição vai está os campos do form, se o user está enviando um parametro pela url ou qualquer tipo de info. que o cliente  está enviando para o servidor vai está dentro da requisição.
// tudo for acessar de informação, variavel, upload de arquivos vai está dentro do req.
//res(resposta) representa a resposta que vai ser dada para o cliente, sempre retorna uma resposta para o cliente
routes.get('/teste', (req, res) => {
    return res.send('Hello World Victor LevyS');
}); */

/*
GET vamos utilizar sempre quando for buscar alguma informação do nosso serviço
POST quando for criar algo
PUT quando for editar
DELETE quando for deletar
*/ 
routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);

routes.post('/boxes/:id/files', multer(multerConfig).single('file'),FileController.store);

// module.exports  exporta alguma informação do meu arquivos, normalmente só se utiliza um module.exports por aquivo, ou seja exportando de arquivo e importando em outro arquivo
module.exports = routes;

//Será usado banco de dados mongoDB , ele é um NOsql, é um tipo de banco que não permite muitas relações, porém é extremamente perfomatico
//mongoose é um orm ou seja um abstração do nosso banco de dados, é uma de usar apenas JS no banco de dados sem precisar utilizar  linguagem SQL