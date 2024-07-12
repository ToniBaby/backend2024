import { Router } from 'express';
import CartManager from '../managers/cartManager.js';

const cartRouter = Router();
const cartManager = new CartManager();

// Obtener todos los carritos
cartRouter.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts(); // Llama al método para obtener todos los carritos
        res.json({ status: 'success', carts }); // Responde con el estado y los carritos obtenidos
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message }); // Responde con un mensaje de error en caso de falla
    }
});

// Obtener un carrito por su ID
cartRouter.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid); // Llama al método para obtener un carrito por ID
        res.json({ status: 'success', cart }); // Responde con el estado y el carrito obtenido
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message }); // Responde con un mensaje de error en caso de falla
    }
});

// Crear un nuevo carrito
cartRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart(); // Llama al método para crear un nuevo carrito
        res.json({ status: 'success', cart: newCart }); // Responde con el estado y el nuevo carrito creado
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message }); // Responde con un mensaje de error en caso de falla
    }
});

// Agregar un producto a un carrito
cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { quantity } = req.body;
        console.log(`Recibido producto ${req.params.pid} con cantidad ${quantity} para el carrito ${req.params.cid}`);
        const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid, quantity);
        res.json({ status: 'success', cart: updatedCart });
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});



// Eliminar un producto de un carrito
cartRouter.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const updatedCart = await cartManager.removeProductFromCart(req.params.cid, req.params.pid); // Llama al método para eliminar un producto del carrito
        res.json({ status: 'success', cart: updatedCart }); // Responde con el estado y el carrito actualizado
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message }); // Responde con un mensaje de error en caso de falla
    }
});

// Actualizar los productos de un carrito
cartRouter.put('/:cid', async (req, res) => {
    try {
        const updatedCart = await cartManager.updateCart(req.params.cid, req.body.products); // Llama al método para actualizar los productos de un carrito
        res.json({ status: 'success', cart: updatedCart }); // Responde con el estado y el carrito actualizado
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message }); // Responde con un mensaje de error en caso de falla
    }
});

// Actualizar la cantidad de un producto en un carrito
cartRouter.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { quantity } = req.body; // Obtiene la cantidad del cuerpo de la solicitud
        const updatedCart = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, quantity); // Llama al método para actualizar la cantidad de un producto en el carrito
        res.json({ status: 'success', cart: updatedCart }); // Responde con el estado y el carrito actualizado
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message }); // Responde con un mensaje de error en caso de falla
    }
});

// Vaciar un carrito
cartRouter.delete('/:cid', async (req, res) => {
    try {
        const updatedCart = await cartManager.clearCart(req.params.cid); // Llama al método para vaciar un carrito
        res.json({ status: 'success', cart: updatedCart }); // Responde con el estado y el carrito actualizado
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message }); // Responde con un mensaje de error en caso de falla
    }
});

export { cartRouter };
