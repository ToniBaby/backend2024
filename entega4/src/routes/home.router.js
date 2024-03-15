import {Router} from "express";
import {ProductManager} from "../productManager.js";

// Crear un nuevo enrutador
const router = Router();

// Ruta al archivo JSON donde se guardan los productos
const path = "products.json";

// Crear una instancia del ProductManager con el archivo de productos
const productManager = new ProductManager(path);

// Endpoint para obtener todos los productos
router.get('/', async (req, res) => {
try {
    // Obtener la lista completa de productos
    const products = await productManager.getProducts();

    const productsData = products.map(product =>({
        title: product.title,
        thumbnail: product.thumbnail,
        description: product.description,
        price: product.price,
        stock: product.stock,
        code: product.code

    }));

    res.render('home',{
        products: productsData,
        titlePage: 'Productos',
        h1: 'Tienda',
        style: ['style.css'],
        script: ['home.js']
    })
    
   
} catch (error) {
     console.error(error);
     res.status(500).send('Error del servidor')
    
    
}
});


export {router as homeRouter};
