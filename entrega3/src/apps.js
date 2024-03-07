import express from 'express';
import ProductManager from './ProductManager.js';
const PORT = 8080;
const app = express();
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let products = []; // Definir products fuera de las rutas

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
    const productId = +req.params.pid;
    if (isNaN(productId)) {
        res.status(400)
        res.json({ error: 'Invalid product id' })
        return
    }
    const product = await productManager.getProductById(productId);
    
    if (!product) {
        res.status(404)
        res.json({ error: 'Product not found' })
        return
    }
    res.send({ product });
});

app.post('/products', async (req, res) => {
    const product = req.body;
    const products = await productManager.createProducts(product);
    product.id = Number.parseInt(Math.random() * 1000); 
    
    
    res.json({ status: 'success', product });
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
});
