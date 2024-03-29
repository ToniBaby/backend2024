const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = './products.json'; 
    }
    
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const products = await this.getProducts();

        if (products.some(product => product.code === code)) {
            console.error('Error: El código del producto ya existe');
            return null;
        }

        let id = 1;
        if (products.length > 0) {
            id = products[products.length - 1].id + 1;
        }

        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        products.push(product);

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

        return product;
    }

    getProducts = async () => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            console.log('Data:', data);
            return JSON.parse(data) || [];
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            return [];
        }
    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        const product = products.find(product => product.id === id);
        if (!product) {
            console.error('Producto no encontrado');
            return null;
        }
        return product;
    }

    updateProduct = async (id, newData) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            console.error('Producto no encontrado');
            return null;
        }
        const updatedProduct = { ...products[index], ...newData };
        products[index] = updatedProduct;

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

        return updatedProduct;
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            console.error('Producto no encontrado');
            return null;
        }
        const deletedProduct = products.splice(index, 1)[0];

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

        return deletedProduct;
    }
}

const productManager = new ProductManager();


async function testProductManager() {
    
    await productManager.addProduct('Producto 1', 'Descripción del producto 1', 100, 'imagen1.jpg', 'A5', 10);

    
    const products = await productManager.getProducts();
    console.log('Productos:', products);

   
    const productById = await productManager.getProductById(1);
    console.log('Producto por ID:', productById);


    const updatedProduct = await productManager.updateProduct(1, { price: 150 });
    console.log('Producto actualizado:', updatedProduct);

   
    const deletedProduct = await productManager.deleteProduct(4);
    console.log('Producto eliminado:', deletedProduct); 

   
    const updatedProducts = await productManager.getProducts();
    console.log('Productos actualizados:', updatedProducts);
}


testProductManager();

 