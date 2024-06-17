import express from "express";
import paths from "./utils/paths.js";
import configHandlebars from "./config/handlebars.config.js"
import serverSocketIO from "./config/socket.config.js";
import { cartRouter } from './routes/cart.router.js';
import homeRouter from './routes/home.router.js';
import { productRouter } from "./routes/products.router.js";
import realTimeProductsRouter from './routes/realTimeProducts.router.js';
const app = express();
const port = 8080;



// Verificar y depurar las rutas configuradas
console.log("Rutas configuradas:", paths);

//configuracion Handlebars
configHandlebars.config(app);

// Middleware para servir archivos estáticos
app.use("/api/public", express.static(paths.public));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));  

// Rutas
app.use('/home', homeRouter); 
app.use('/realtimeproducts', realTimeProductsRouter); 
app.use('/api/carts', cartRouter); 
app.use('/api/products', productRouter); 

// Inicia el servidor
const serverHTTP = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Configuración de Socket.IO
serverSocketIO.config(serverHTTP);
