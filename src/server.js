const express = require ("express");
const mongoose = require ("mongoose");
const path = require ("path");
const cors = require ("cors");
const app = express ();
app.use(cors());
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on("connection", socket => {
    //criou-se salas no Box para separar os usuarios e terem salas isoladas
    //oq esta acontecendo aqui quando receber uma conexão no webSocket, ou seja uma vez q o user abrir a minha aplicação lá no front-end, vai ser recebido esse socket
    //esse socket é a representação da conexão do user com o realtime ou seja servidor 
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect("mongodb+srv://Victor:victorlevy100@cluster0-kdf0c.mongodb.net/teste?retryWrites=true",{
// useNewUrlParser=true para utilizar a url acima, assim informa para o mongoose que vai ser utilizado esse formato
    useNewUrlParser: true
});
//app.use quando se deseja cadastrar um módulo dentro do meu express

//(express.json()) ajuda o servidor a entender as requisições que estão vindo em formato json
//json não permite o envio de arquivos,estrutura de dados muito utilizada no conceito de ApiRest(serviço que não tem uma interface visual, apenas fornece dados para outras interfaces visuais)
// json serviço que receba dados do front-end e retorne dados (atraves banco de dados ou outro serviço) para o front-end 
app.use(express.json());
app.use((req, res, next) => {
   //basicamente está passando uma informação global para minha aplicação definindo uma nova variável dentro de req
   //apartir desse momento todo o controller que for chamado, toda rota, que vier desse app.use aq, vai ter acesso a informação io.on dentro do req.
    req.io=io;
    return next();
});
//urlencoded ele permite o envio de arquivos nas requisições
app.use(express.urlencoded({ extended:true }));
//redirecionamento, toda vez que o user acessar a rota files a gente vai buscar os arquivos fisicos que contem dentro da pasta tmp
app.use('/files', express.static(path.resolve(__dirname, "..", "tmp")));
//Arquivo de rota separado
//require('./routes') passa um caminho para o meu novo camnho de rotas
app.use (require("./routes"));


//variaveis ambiente podem sobrescrever informações dentro da nossa aplicação, de   pendendo onde nossa aplicação está rodando
//ex: caso queira usar outra porta
//PORT é definida automaticamente pelo heroku com a porta que vai rodar a aplicação
server.listen(process.env.PORT || 3333);