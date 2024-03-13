    import {Router} from "express";
    import {ProductManager} from "../managers/productManager.js";

    // Crear un nuevo enrutador
    const router = Router();

    // Ruta al archivo JSON donde se guardan los productos
    const path = "products.json";

    // Crear una instancia del ProductManager con el archivo de productos
    const productManager = new ProductManager(path);

    // Endpoint para obtener todos los productos
    router.get('/', async (req, res) => {
    try {
        // Obtener el límite de productos a mostrar
        const limit = parseInt(req.query.limit);
        // Obtener la lista completa de productos
        const products = await productManager.getProducts();
        
        // Limitar la lista de productos si se especifica un límite
        let limitedProducts = products;
        if (!isNaN(limit)) {
            limitedProducts = products.slice(0, limit);
        }
        
        // Enviar la lista de productos limitada como respuesta
        res.status(200).send({
            status: "success",
            productos: limitedProducts
        });
    } catch (error) {
        // Enviar un mensaje de error si ocurre algún problema
        res.status(500).send({
            status: 500,
            message: 'Error',
            error: error.message
        });
    }
    });

    // Endpoint para obtener un producto por su ID
    router.get('/:pid', async (req,res)=>{
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid);
        if (!product) {
            res.status(404).send({
                status: 'error',
                message: 'Producto no encontrado'
            });
        } else {
            res.status(200).send({
                status: 'success',
                producto: product
            });
        }
    });

    // Endpoint para crear un nuevo producto
    router.post('/', async (req,res)=>{ //creacion

    const product = req.body; //Json con el producto 

    const products = await productManager.createProducts(product);

    res.send({
        status: "success",
        msg: "Producto creado",
        productos: products
        })
    })

    // Endpoint para agregar un producto al carrito
    router.post('/:pid/add-to-cart/:cid', async (req, res) => {
    const pid = req.params.pid; 
    const cid = req.params.cid; 

    res.send({
        status: "success",
        message: `Agregado producto con ID ${pid} al carrito con ID ${cid}`
    });
    });

    // Endpoint para actualizar un producto
    router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const newData = req.body;

        const updatedProduct = await productManager.updateProduct(productId, newData);

        // Enviar un mensaje de éxito si se actualiza correctamente
        if (!updatedProduct) {
            res.status(404).send({
                status: 'error',
                message: 'Producto no encontrado'    
            });
        } else {
            res.status(200).send({
                status: 'success',
                message: 'Producto actualizado correctamente',
                producto: updatedProduct
            });
        }
    } catch (error) {
        // Enviar un mensaje de error si ocurre algún problema
        res.status(500).send({
            status: 500,
            message: 'Producto no encontrado',
            error: error.message
        });
    }
    });

    // Endpoint para eliminar un producto
    router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);

        const deletedProduct = await productManager.deleteProduct(productId);

        // Enviar un mensaje de éxito si se elimina correctamente
        if (!deletedProduct) {
            res.status(404).send({
                status: 'error',
                message: 'Producto no encontrado'
            });
        } else {
            res.status(200).send({
                status: 'success',
                message: 'Producto eliminado correctamente',
                deletedProduct: deletedProduct
            });
        }
    } catch (error) {
        // Enviar un mensaje de error si ocurre algún problema
        res.status(500).send({
            status: 500,
            message: 'Error',
            error: error.message
        });
    }
    });

    // Exportar el enrutador
    export {router as productRouter};
