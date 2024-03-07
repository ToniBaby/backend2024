import fs from 'fs';

export default class ProductManager {
    constructor() {
        this.path = '../files/products.json'; // Ruta del archivo JSON donde se guardarán los productos
    }

   // Método para agregar un producto
addProduct = async (title, description, price, thumbnail, code, stock) => {
    const products = await this.getProducts(); // Obtener la lista actual de productos

    // Validar que el código del producto no esté repetido
    if (products.some(product => product.code === code)) {
        console.error('Error: El código del producto ya existe');
        return null;
    }

    // Generar un nuevo ID para el producto
    let id = 1;
    if (products.length > 0) {
        id = products[products.length - 1].id + 1;
    }

    // Crear el objeto del nuevo producto
    const product = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    };

    // Agregar el nuevo producto a la lista
    products.push(product);

    // Escribir la lista actualizada de productos en el archivo
    try {
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return product; // Devolver el producto agregado
    } catch (error) {
        console.error('Error al escribir en el archivo:', error);
        return null;
    }
}


    // Método para obtener todos los productos
    getProducts = async () => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8'); // Leer el archivo JSON
            return JSON.parse(data) || []; // Convertir los datos a un array de productos
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            return []; // Devolver un array vacío si hay un error
        }
    }

    createProducts = async (product) => {
        try {
            const products = await this.getProducts();
    
            
            const requiredFields = ["title", "description", "code", "price", "status", "stock", "category"];
            for (const field of requiredFields) {
                if (!product[field]) {
                    throw new Error(`El campo ${field} es obligatorio.`);
                }
            }
    
           
            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1;
            }
    
          
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            
            return { status: 201, message: 'Producto creado correctamente', producto: product };
        } catch (error) {
            return { status: 400, message: 'Error al crear el producto', error: error.message };
        }
    }

    // Método para obtener un producto por su ID
    getProductById = async (id) => {
        const products = await this.getProducts(); // Obtener la lista de productos
        const product = products.find(product => product.id === id); // Buscar el producto por su ID
        if (!product) {
            console.error('Producto no encontrado');
            return null;
        }
        return product; // Devolver el producto encontrado
    }

    // Método para actualizar un producto
    updateProduct = async (id, newData) => {
        const products = await this.getProducts(); // Obtener la lista de productos
        const index = products.findIndex(product => product.id === id); // Encontrar el índice del producto a actualizar
        if (index === -1) {
            console.error('Producto no encontrado');
            return null;
        }
        const updatedProduct = { ...products[index], ...newData }; // Actualizar los datos del producto
        products[index] = updatedProduct; // Reemplazar el producto en la lista

        // Escribir la lista actualizada de productos en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

        return updatedProduct; // Devolver el producto actualizado
    }

    // Método para eliminar un producto
    deleteProduct = async (id) => {
        const products = await this.getProducts(); // Obtener la lista de productos
        const index = products.findIndex(product => product.id === id); // Encontrar el índice del producto a eliminar
        if (index === -1) {
            console.error('Producto no encontrado');
            return null;
        }
        const deletedProduct = products.splice(index, 1)[0]; // Eliminar el producto de la lista

        // Escribir la lista actualizada de productos en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

        return deletedProduct; // Devolver el producto eliminado
    }
}

