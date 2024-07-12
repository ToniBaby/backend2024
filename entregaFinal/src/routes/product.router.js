import { Router } from 'express';
import ProductManager from '../managers/productManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/:id', async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.id);
        if (product) {
            res.render('product', {
                title: product.title,
                product: product
            });
        } else {
            res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al obtener el producto', error: error.message });
    }
});

export { router as productDetailRouter };
