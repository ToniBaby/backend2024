import mongoose from 'mongoose';
import Product from '../models/product.model.js';

class ProductManager {
  // Método para obtener todos los productos con filtros, paginación y ordenamiento.
  async getProducts(filter = {}, options = {}) {
    try {
      const sortOption = {};
      if (options.sort) {
        sortOption.price = options.sort === 'asc' ? 1 : -1;
      }
      const products = await Product.paginate(filter, { ...options, sort: sortOption });
      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos: ' + error.message);
    }
  }

  // Método para obtener un producto por su ID.
  async getProductById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID no válido');
      }
      const product = await Product.findById(id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    } catch (error) {
      throw new Error('Error al obtener el producto: ' + error.message);
    }
  }

  // Método para agregar un nuevo producto.
  async addProduct(productData) {
    try {
      const newProduct = new Product(productData);
      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (error) {
      throw new Error('Error al agregar el producto: ' + error.message);
    }
  }

  // Método para actualizar un producto existente.
  async updateProduct(id, newData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID no válido');
      }
      const updatedProduct = await Product.findByIdAndUpdate(id, newData, { new: true });
      if (!updatedProduct) {
        throw new Error('Producto no encontrado');
      }
      return updatedProduct;
    } catch (error) {
      throw new Error('Error al actualizar el producto: ' + error.message);
    }
  }

  // Método para eliminar un producto por su ID.
  async deleteProduct(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID no válido');
      }
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        throw new Error('Producto no encontrado');
      }
      return deletedProduct;
    } catch (error) {
      throw new Error('Error al eliminar el producto: ' + error.message);
    }
  }
}

export default ProductManager;
