import express from "express";
import path from "path";
import __dirname from "./utils.js";
import { productRouter } from "./routes/products.router.js";
import { cartRouter } from "./routes/carts.router.js";
import handlebars from "express-handlebars";
import {Server} from "socket.io";
import { realTimeProductsRouter } from "./routes/realTimeProducts.router.js";

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


app.get('/', (req,res)=>{
    let testUser = {
        name:"Hilda",
        last_name:"mainini"
    }
    res.render('index' , testUser);
});

// Servidor para Socket

const socketServer = new Server(httpServer);

app.set('ws', socketServer)

socketServer.on('connection', (socket)=>{
    console.log('Nuevo cliente conectado')
})


//Rutas

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use('realTimeProducts', realTimeProductsRouter);

