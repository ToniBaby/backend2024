import express from 'express';
import { createServer } from 'http';
import { cartRouter } from './routes/cart.router.js';
import { productRouter } from './routes/products.router.js';
import { productDetailRouter } from './routes/product.router.js'; // Importa el nuevo router
import configHandlebars from "./config/handlebars.config.js";
import mongoDB from "./config/mongo.config.js";
import serverSocketIO from "./config/socket.config.js";
import paths from "./utils/paths.js"; 

const app = express();
const serverHTTP = createServer(app);
const port = 8080;

configHandlebars.config(app);

app.use("/js", express.static(paths.public + "/js"));  
app.use("/css", express.static(paths.public + "/css"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));  



// Agrega la nueva ruta para productos detallados
app.use('/products', productDetailRouter);

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

mongoDB.connectDB();

serverHTTP.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

serverSocketIO.config(serverHTTP);
