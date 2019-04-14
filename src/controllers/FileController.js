const Box = require('../model/Box');
const File = require('../model/File');

class FileController{
    //permitir que o usuario crie novos box
    //async é a forma mais facil de lidar com requisições assincronas 
   async store(req, res){
       // retorna todos os parametros que vem atraves das rotas
       const box =  await Box.findById(req.params.id);  

       const file = await File.create({
           title: req.file.originalname,
           path: req.file.key,
       });
       //push() para colocar uma nov informação dentro dessa array
       box.files.push(file);

       await box.save();
       
       //pega todos os usuarios que estão naquela box com aquele id
       //emit envia uma informação para o user
       //apartir de agora quando duas pessoas estão em uma box, e um está por mobile e outro pelo pc, qnd algum dos dois criar uma pasta o outro vai receber uma informação que foi criado uma pasta
    
       req.io.sockets.in(box._id).emit("file",file);

       return res.json(file);
    }
}
//retorna a instancia de uma classe
module.exports = new FileController ();