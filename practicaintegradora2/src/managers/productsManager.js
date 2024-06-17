import fs from "fs";
import path from "path";
import paths from "../utils/paths.js"; 

class ProductManagerFile {
  constructor(pathFile) {
      this.path = path.join(paths.files, pathFile); // Usamos paths.files en lugar de __dirname
  }

  // Método para obtener todos los productos.
  getProducts = async () => {
      if (fs.existsSync(this.path)) {
          const data = await fs.promises.readFile(this.path, 'utf-8');
          return JSON.parse(data); 
      } else {
          return [];
      }
  }

  // Método para obtener un producto por su ID.
  getProductById = async (id) => {
      const products = await this.getProducts();
      return products.find(product => product.id === id);
  }

  // Método para agregar un nuevo producto.
  addProduct = async (product) => {
      const products = await this.getProducts();

      const requiredFields = ["title", "description", "code", "price", "stock", "category"];
      for (const field of requiredFields) {
          if (!product[field]) {
              throw new Error(`El campo ${field} es obligatorio.`);
          }
      }

      product.id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
      product.status = true;
      products.push(product);

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
      return products; // Retorna el array completo de productos.
  }

  // Método para actualizar un producto existente.
  updateProduct = async (id, newData) => {
      const products = await this.getProducts();
      const index = products.findIndex(product => product.id === id);

      if (index === -1) {
          throw new Error('Producto no encontrado');
      }

      products[index] = { ...products[index], ...newData, id: products[index].id };

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
      return products[index];
  }

  // Método para eliminar un producto por su ID.
  deleteProduct = async (id) => {
      const products = await this.getProducts();
      const index = products.findIndex(product => product.id === id);

      if (index === -1) {
          throw new Error('Producto no encontrado');
      }

      products.splice(index, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
      return products; // Retorna el array completo de productos.
  }
}

export default ProductManagerFile;
