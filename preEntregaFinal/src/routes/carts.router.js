import {Router} from "express";
import {CartManager} from  "../managers/cartManager.js";

// Ruta del archivo donde se guardan los carritos
const path = "carts.json";
const router = Router();

// Crear una instancia del CartManager con la ruta del archivo
const cartManager = new CartManager(path);

// Endpoint para obtener todos los carritos
router.get('/', async (req,res)=>{
    const carts = await cartManager.getCarts();
    res.send({
        status: "success",
        carritos: carts
    });
});

// Endpoint para obtener un carrito por su ID
router.get('/:cid', async (req,res)=>{
    const cid = req.params.cid;
    res.send({
        status: "success",
        msg: `Ruta GET ID CARTS con ID: ${cid}`
    });
});

// Endpoint para crear un nuevo carrito
router.post('/', async (req,res)=>{ 
    const cart = req.body; // Datos del carrito en formato JSON
    const carts = await cartManager.createCarts(cart);
    res.send({
        status: "success",
        msg: "Carrito creado",
        carritos: carts
    });
});


// Endpoint para agregar un producto a un carrito
router.post('/:cid/product/:pid', async (req,res)=>{
    const cid = req.params.cid; // ID del carrito
    const pid = req.params.pid; // ID del producto a agregar

    // Obtener el carrito por su ID
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
        res.status(404).send({
            status: 'error',
            message: 'Carrito no encontrado'
        });
        return;
    }

    // Verificar si el carrito tiene la propiedad 'products' definida
    if (!cart.products) {
        cart.products = [];
    }

    // Agregar el producto al carrito
    cart.products.push({ productId: pid, quantity: 1 });

    // Guardar el carrito actualizado en el archivo
    await cartManager.updateCart(cid, cart);

    res.send({
        status: "success",
        message: `Producto agregado al carrito con ID ${cid}`,
        cart: cart
    });
});



// Endpoint para actualizar un carrito
router.put('/:cid', async (req,res)=>{
    const cid = req.params.cid; // ID del carrito a actualizar
    res.send({
        status: "success",
        msg: `Ruta PUT de CARTS con ID: ${cid}`
    });
});

// Endpoint para eliminar un carrito
router.delete('/:cid', async (req,res)=>{
    const cid = req.params.cid; // ID del carrito a eliminar
    res.send({
        status: "success",
        msg: `Ruta DELETE de CARTS con ID: ${cid}`
    });
});

export {router as cartRouter};
