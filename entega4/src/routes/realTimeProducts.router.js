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

    res.render('realTimeProducts',{
        products: productsData,
        titlePage: 'Productos',
        h1: 'Tienda',
        style: ['style.css'],
        script: ['realTimeProducts.js'],
        useWS: true
    });
    
   
} catch (error) {
     console.error(error);
     res.status(500).send('Error del servidor')
}
});

router.post('/', async (req,res) =>{
    console.log(req.body)

   await productManager.createProducts(
        req.body.title,
        req.body.description,
        +req.body.price,
        req.body.thumbnail,
        req.body.code,
        req.body.status,
        +req.body.stock,
    )

    //notificar a los clientes por ws que se agrego un producto

     req.app.get('ws').emit('newProduct', req.body)

    res.json(req.body)


})


export {router as realTimeProductsRouter};
