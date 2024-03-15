import express from "express";
import path from "path";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import {Server} from "socket.io";
import { realTimeProductsRouter } from "./routes/realTimeProducts.router.js";
import { homeRouter } from "./routes/home.router.js";

const PORT = 8080;
const app = express();
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
});

//Configuracion para plantillas 
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
/* app.set('views',__dirname+'views'); */
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Servidor para Socket

const socketServer = new Server(httpServer);

app.set('ws', socketServer)

socketServer.on('connection', (socket)=>{
    console.log('Nuevo cliente conectado')

    
})


//Rutas


app.use('/realTimeProducts', realTimeProductsRouter);
app.use('/home', homeRouter);

