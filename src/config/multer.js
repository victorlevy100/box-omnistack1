const multer = require('multer');
const path = require('path');
//serve para gerar rest, ou conjuntos de caracteres unicos
const crypto = require('crypto');
module.exports = {
    //é o destino para onde os meus arquivos vão
    //path.resolve serve para não se ter problema na hora de escolher o caminho
    //__dirname = essa variavel retorna o diretorio onde o arq. multer está
    dest: path.resolve(__dirname, '..', '..', 'tmp'), 
    //é um tipo de armazenamento q o multer oferece 
    storage: multer.diskStorage ({
        //obrigatorio configurar essas duas propriedades
        //cb (callback) = chama no momento que já foi determinado a localização
        destination: (req, file, cb) => {
            cb (null,path.resolve(__dirname, '..', '..', 'tmp'));
        },
        //determina qual o nome do arquivo dentro desse projeto
        filename: (req, file, cb) => {  
            //gera um numero de bytes aleatorios
            crypto.randomBytes(16, (err, hash) => {
            if (err) cb(err);
            
            //essa propriedade file está no file de filename
            //essa key vai ter uam string em hexadecimal e o nome do arquivo
            file.key = `${hash.toString('hex')}-${file.originalname}`;
            cb(null, file.key);
        })
        }
    })

};