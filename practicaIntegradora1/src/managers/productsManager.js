import fs from "fs";
import path from "path";
import __dirname from "../utils.js"; 

class ProductManagerFile {
  constructor(pathFile) {
      this.path = path.join(__dirname, `/files/${pathFile}`);
      // Configura la ruta completa del archivo de productos usando el directorio base y el nombre del archivo pasado como argumento.
  }

  // Método para obtener todos los productos.
  getProducts = async () => {
      if (fs.existsSync(this.path)) {
          // Verifica si el archivo de productos existe.
          const data = await fs.promises.readFile(this.path, 'utf-8');
          // Lee el contenido del archivo de productos de forma asíncrona.
          return JSON.parse(data); 
          // Parsea el contenido del archivo de JSON a un objeto de JavaScript y lo retorna.
      } else {
          return [];
          // Si el archivo no existe, retorna un array vacío.
      }
  }

  // Método para obtener un producto por su ID.
  getProductById = async (id) => {
      const products = await this.getProducts();
      // Obtiene todos los productos.
      return products.find(product => product.id === id);
      // Encuentra y retorna el producto con el ID proporcionado.
  }

  // Método para agregar un nuevo producto.
  addProduct = async (product) => {
      const products = await this.getProducts();
      // Obtiene todos los productos.

      // Verificación de campos obligatorios
      const requiredFields = ["title", "description", "code", "price", "stock", "category"];
      for (const field of requiredFields) {
          if (!product[field]) {
              throw new Error(`El campo ${field} es obligatorio.`);
              // Lanza un error si algún campo obligatorio no está presente.
          }
      }

      product.id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
      // Genera un ID único para el nuevo producto.
      product.status = true; // Establece el estado del producto como verdadero por defecto.
      products.push(product);
      // Agrega el nuevo producto al array de productos.

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
      // Escribe el array de productos actualizado en el archivo de productos.
      return product;
      // Retorna el nuevo producto.
  }

  // Método para actualizar un producto existente.
  updateProduct = async (id, newData) => {
      const products = await this.getProducts();
      // Obtiene todos los productos.
      const index = products.findIndex(product => product.id === id);
      // Encuentra el índice del producto con el ID proporcionado.

      if (index === -1) {
          throw new Error('Producto no encontrado');
          // Lanza un error si el producto no se encuentra.
      }

      products[index] = { ...products[index], ...newData, id: products[index].id };
      // Actualiza los datos del producto sin cambiar el ID.

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
      // Escribe el array de productos actualizado en el archivo de productos.

      return products[index];
      // Retorna el producto actualizado.
  }

  // Método para eliminar un producto por su ID.
  deleteProduct = async (id) => {
      const products = await this.getProducts();
      // Obtiene todos los productos.
      const index = products.findIndex(product => product.id === id);
      // Encuentra el índice del producto con el ID proporcionado.

      if (index === -1) {
          throw new Error('Producto no encontrado');
          // Lanza un error si el producto no se encuentra.
      }

      const deletedProduct = products.splice(index, 1)[0];
      // Elimina el producto del array y lo guarda en deletedProduct.

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
      // Escribe el array de productos actualizado en el archivo de productos.

      return deletedProduct;
      // Retorna el producto eliminado.
  }
}

export default ProductManagerFile;
// Exporta la clase ProductManagerFile como módulo por defecto.
