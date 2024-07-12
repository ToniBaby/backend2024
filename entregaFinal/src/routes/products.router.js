import { Router } from 'express';
import ProductManager from '../managers/productManager.js';

const router = Router();
const productManager = new ProductManager();

// Endpoint para obtener productos con filtros y renderizar la vista
router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        // Convertir los parámetros a los tipos correctos
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : null,
            lean: true
        };

        const filter = query ? { $or: [{ category: query }, { status: query }] } : {};

        const products = await productManager.getProducts(filter, options);

        // Generar los enlaces para la paginación
        const generateLink = (page) => `/api/products?limit=${limit}&page=${page}&sort=${sort || ''}&query=${query || ''}`;

        res.render('products', {
            title: 'Lista de Productos',
            products: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? generateLink(products.prevPage) : null,
            nextLink: products.hasNextPage ? generateLink(products.nextPage) : null
        });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al obtener los productos', error: error.message });
    }
});

// Endpoint para obtener un producto por su ID
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

// Endpoint para agregar un nuevo producto
router.post('/', async (req, res) => {
    try {
        const product = await productManager.addProduct(req.body);
        res.send({ status: 'success', message: 'Producto creado', product });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al crear el producto', error: error.message });
    }
});

// Endpoint para actualizar un producto existente
router.put('/:id', async (req, res) => {
    try {
        const product = await productManager.updateProduct(req.params.id, req.body);
        res.send({ status: 'success', message: 'Producto actualizado', product });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al actualizar el producto', error: error.message });
    }
});

// Endpoint para eliminar un producto por su ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await productManager.deleteProduct(req.params.id);
        res.send({ status: 'success', message: 'Producto eliminado', product });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al eliminar el producto', error: error.message });
    }
});

export { router as productRouter };
