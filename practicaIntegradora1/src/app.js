import express from 'express'; // Importa el módulo 'express' para crear el servidor.
import {productRouter} from './routes/product.router.js';
import {cartRouter} from './routes/cart.router.js'; // Importa las rutas para carritos desde 'cartRoutes.js'.

const app = express(); // Crea una instancia de la aplicación Express.
const port = 8080; // Define el puerto en el que el servidor escuchará.

app.use(express.json()); // Middleware para parsear JSON en los cuerpos de las solicitudes.

app.use('/api/products', productRouter); // Define las rutas para productos en '/api/products'.
app.use('/api/carts', cartRouter); // Define las rutas para carritos en '/api/carts'.

app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Inicia el servidor y escucha en el puerto definido. Muestra un mensaje en la consola indicando que el servidor está corriendo.
});
