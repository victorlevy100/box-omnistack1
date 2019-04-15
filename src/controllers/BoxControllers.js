const Box = require("../model/Box");

class BoxController{
    //permitir que o usuario crie novos box
    //async é a forma mais facil de lidar com requisições assincronas 
   async store(req, res){
       
        //é a forma de criar uma nova Box
        const box = await Box.create({title: req.body.title});
        return res.json(box);
    }
        //vai retornar a box e todos os arquivosque contém dentro dessa boxes
    async show (req, res){
        const box = await Box.findById(req.params.id).populate({
            //popula um relacionamento
            path: 'files',
            //  sort faz a ordenação
            //createdAt que armazena pela data de criação
            options: {sort: {createdAt: -1}}    
        });

        return res.json(box);   
    }
}
//retorna a instancia de uma classe
module.exports = new BoxController ();