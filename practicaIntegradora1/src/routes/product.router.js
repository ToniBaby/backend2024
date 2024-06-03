import {Router} from "express";
import ProductManagerFile from  "../managers/productsManager.js";

const path = "products.json";
const router = Router();
const productManagerFile = new ProductManagerFile(path);

router.get('/', async (req, res) => {
   try {
       const limit = parseInt(req.query.limit); // Obtiene el parámetro 'limit' de la consulta y lo convierte a número.
       const products = await productManagerFile.getProducts(); // Obtiene todos los productos.
     
       let limitedProducts = products;
       if (!isNaN(limit)) {
           limitedProducts = products.slice(0, limit); // Aplica el límite si se proporcionó.
       }
       
       res.status(200).send({
           status: 'success',
           productos: limitedProducts
       }); // Responde con los productos limitados (o todos los productos si no se proporcionó límite).
   } catch (error) {
       res.status(500).send({
           status: 'error',
           message: 'Error al obtener los productos',
           error: error.message
       }); // Maneja errores y responde con un estado 500 y el mensaje de error.
   }
});

router.get('/:pid', async (req, res) => {
   try {
       const product = await productManagerFile.getProductById(parseInt(req.params.pid)); // Obtiene el producto por su ID.
       if (product) {
           res.send({
               status: 'success',
               producto: product
           }); // Responde con el producto si se encuentra.
       } else {
           res.status(404).send({
               status: 'error',
               message: 'Producto no encontrado'
           }); // Responde con un estado 404 si el producto no se encuentra.
       }
   } catch (error) {
       res.status(500).send({
           status: 'error',
           message: 'Error al obtener el producto',
           error: error.message
       }); // Maneja errores y responde con un estado 500 y el mensaje de error.
   }
});

router.post('/', async (req, res) => {
   try {
       const product = req.body; // Obtiene el producto del cuerpo de la solicitud.
       const newProduct = await productManagerFile.addProduct(product); // Agrega el nuevo producto.
       res.send({
           status: 'success',
           message: 'Producto creado',
           producto: newProduct
       }); // Responde con el nuevo producto creado.
   } catch (error) {
       res.status(400).send({
           status: 'error',
           message: 'Error al crear el producto',
           error: error.message
       }); // Maneja errores y responde con un estado 400 y el mensaje de error.
   }
});

router.put('/:pid', async (req, res) => {
   try {
       const updatedProduct = await productManagerFile.updateProduct(parseInt(req.params.pid), req.body); // Actualiza el producto por su ID.
       res.send({
           status: 'success',
           message: 'Producto actualizado',
           producto: updatedProduct
       }); // Responde con el producto actualizado.
   } catch (error) {
       res.status(404).send({
           status: 'error',
           message: 'Error al actualizar el producto',
           error: error.message
       }); // Maneja errores y responde con un estado 404 y el mensaje de error.
   }
});

router.delete('/:pid', async (req, res) => {
   try {
       const deletedProduct = await productManagerFile.deleteProduct(parseInt(req.params.pid)); // Elimina el producto por su ID.
       res.send({
           status: 'success',
           message: 'Producto eliminado',
           producto: deletedProduct
       }); // Responde con el producto eliminado.
   } catch (error) {
       res.status(404).send({
           status: 'error',
           message: 'Error al eliminar el producto',
           error: error.message
       }); // Maneja errores y responde con un estado 404 y el mensaje de error.
   }
});

export { router as productRouter };