// model box que representa uma pasta dentro da aplicação
const mongoose = require('mongoose');

//schema é como uma tabela dos bancos relacionais
//banco de dados não relacionais não tem conceitos de tabelas por isso se chamam de Schema
const File = new mongoose.Schema({
    //informamos que o titulo é obrigatorio
    title: {
        type: String,
        required: true
    },
    path:{
        //nome do arquivo fisico armazenado na minha aplicação
        type: String,
        required: true
    },
},
{
    //timestamp: true = cria um campo chamado create apt e update apt, em cada registro do minha tabela (create apt armazena a data de criação de serviço e o update apt a data de modificação do registro)
    timestamps: true,
    //toda vez que esse tipo de informação que o arquivo for convertido em um Json ou em um objeto, ele irá fazer o carregamento do File.virtual automaticamente
    //Por que foi colocado isso? pois lá no box controller, quando  a gente da aquele res.json o File é convertido em json
    toObject: { virtuals: true},
    toJSON: { virtuals: true }

}
);
//Um campo virtual no mongoDB, é um campo que não existe dentro da tabela, porem existe no lado do back-end
File.virtual('url').get(function(){
    //encodeURIComponent() é para o texto que estará dentro passar para formato url ser lido em encode
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;
});


module.exports = mongoose.model("File", File);