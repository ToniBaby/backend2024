import express from 'express';
import ProductManager from './ProductManager.js';
const PORT = 8080;
const app = express();
const productManager = new ProductManager();



app.get('/products', async (req, res) => {
    let limit = parseInt(req.query.limit);
  
    
    if (isNaN(limit) || limit <= 0) {
      console.error('Error: El parámetro "limit" debe ser un número entero positivo');
      limit = undefined; 
    }
  
    let products = await productManager.getProducts(limit);
    res.send({ products });
  });

  app.get('/products/:pid', async (req, res) => {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);
    res.send({ product });
  });

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});
