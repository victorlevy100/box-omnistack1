// model box que representa uma pasta dentro da aplicação
const mongoose = require("mongoose");

//schema é como uma tabela dos bancos relacionais
//banco de dados não relacionais não tem conceitos de tabelas por isso se chamam de Schema
const Box = new mongoose.Schema({
    //informamos que o titulo é obrigatorio
    title: {
        type: String,
        required: true
    },
    // é um array de model File
    //vai armazenar os ids dos arquivos que pertencem ao box
    files:[{type: mongoose.Schema.Types.ObjectId, ref: "File" }]
},
{
    //timestamp: true = cria um campo chamado create apt e update apt, em cada registro do minha tabela (create apt armazena a data de criação de serviço e o update apt a data de modificação do registro)
    timestamps: true
}
);

module.exports = mongoose.model("Box", Box);






