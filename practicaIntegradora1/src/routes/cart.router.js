import { Router } from 'express';
import CartManagerFile from '../managers/cartManager.js';

const path = 'carts.json';
const router = Router();
const cartManagerFile = new CartManagerFile(path);

router.get('/', async (req, res) => {
    try {
        const carts = await cartManagerFile.getCarts();
        res.send({
            status: 'success',
            carritos: carts
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Error al obtener los carritos',
            error: error.message
        });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManagerFile.getCartById(parseInt(req.params.cid));
        if (cart) {
            res.send({
                status: 'success',
                carrito: cart
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'Carrito no encontrado'
            });
        }
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Error al obtener el carrito',
            error: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManagerFile.createCart();
        res.send({
            status: 'success',
            message: 'Carrito creado',
            carrito: newCart
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Error al crear el carrito',
            error: error.message
        });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const updatedCart = await cartManagerFile.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
        res.send({
            status: 'success',
            message: `Producto agregado al carrito con ID: ${req.params.cid}`,
            carrito: updatedCart
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Error al agregar el producto al carrito',
            error: error.message
        });
    }
});

export { router as cartRouter };
