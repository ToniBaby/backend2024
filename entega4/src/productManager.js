import fs from "fs";
import path from "path";
import __dirname from "./utils.js"

class ProductManager {
    constructor(pathFile){
        this.path = path.join(__dirname,`/files/${pathFile}`);
    }

    // Método para obtener la lista de productos
    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            let products = JSON.parse(data);
    
            const requiredFields = ["title", "description", "code", "price", "status", "stock", "category", "thumbnails"];
    
            // Completar los campos faltantes con valores vacíos
            products = products.map(product => {
                requiredFields.forEach(field => {
                    if (!product.hasOwnProperty(field)) {
                        product[field] = ''; 
                    }
                });
                return product;
            });
    
            return products;
        } else {
            return [];
        }
    }


    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find(product => product.id === parseInt(id));

        console.log(product); // Verifica si el producto con el ID dado se encuentra
        return product || null;
    }
    // Método para crear un nuevo producto
    createProducts = async (product) => {
        try {
            const products = await this.getProducts();
    
            const requiredFields = ["title", "description", "code", "price", "status", "stock", "category"];
            // Validar que todos los campos requeridos estén presentes en el producto
            for (const field of requiredFields) {
                if (!product[field]) {
                    throw new Error(`El campo ${field} es obligatorio.`);
                }
            }
    
            // Asignar un nuevo ID al producto
            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1;
            }
    
            // Agregar el producto a la lista y guardarla en el archivo
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            
            return { status: 201, message: 'Producto creado correctamente', producto: product };
        } catch (error) {
            return { status: 400, message: 'Error al crear el producto', error: error.message };
        }
    }

    // Método para actualizar un producto existente
    updateProduct = async (id, newData) => {
        try {
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id === id);
    
            if (index === -1) {
                throw new Error('Producto no encontrado');
            }
    
            const requiredFields = ["title", "description", "code", "price", "status", "stock", "category", "thumbnails"];
            // Validar que los campos requeridos estén presentes en newData
            for (const field of requiredFields) {
                if (!(field in newData)) {
                    throw new Error(`El campo ${field} es obligatorio para actualizar.`);
                }
            }
    
            // Actualizar el producto y guardar la lista actualizada en el archivo
            products[index] = { ...products[index], ...newData };

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
    
            return products[index];
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    // Método para eliminar un producto
    deleteProduct = async (productId) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === productId);
    
        if (index === -1) {
            console.error('Producto no encontrado');
            return null;
        }
    
        // Eliminar el producto de la lista y guardar la lista actualizada en el archivo
        const deletedProduct = products.splice(index, 1)[0];
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
    
        return deletedProduct;
    }
}

export {ProductManager};
