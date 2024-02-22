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
  
      return products;
  }

  
  getProducts = async () => {
    try {
        const data = await fs.promises.readFile(this.path, 'utf-8');
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

(async () => {
    
    console.log('Instancia de ProductManager creada');

 
    let products = await productManager.getProducts();
    if (products.length === 0) {
        console.log('getProducts - OK');
    } else {
        console.error('Error en getProducts');
    }

   
    await productManager.addProduct(
        "producto prueba",
        "Este es un producto prueba",
        200,
        "Sin imagen",
        "abc123",
        25
    );

    // verificar que el producto se agregó correctamente
    products = await productManager.getProducts();
    if (products.length === 1) {
        console.log('Producto agregado correctamente');
    } else {
        console.error('Error al agregar el producto');
    }

    // Llamar id del producto recién agregado
    const productId = products[0].id;
    const productById = await productManager.getProductById(productId);
    if (productById !== null) {
        console.log('getProductById - OK');
    } else {
        console.error('Error en getProductById');
    }

    // actualizar un campo del producto
    const updatedProduct = await productManager.updateProduct(productId, { price: 300 });
    if (updatedProduct !== null && updatedProduct.price === 300) {
        console.log('updateProduct - OK');
    } else {
        console.error('Error en updateProduct');
    }

    // eliminar el producto
   /*  const deletedProduct = await productManager.deleteProduct(productId);
    if (deletedProduct !== null) {
        console.log('deleteProduct - OK');
    } else {
        console.error('Error en deleteProduct');
    } */
})();


