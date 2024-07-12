import Cart from '../models/cart.model.js';

class CartManager {
    async getCarts() {
        try {
            const carts = await Cart.find().populate('products.product');
            return carts;
        } catch (error) {
            console.error('Error al obtener los carritos:', error);
            throw new Error('Error al obtener los carritos');
        }
    }

    async getCartById(id) {
        try {
            console.log('Obteniendo carrito con ID:', id);
            const cart = await Cart.findById(id).populate('products.product');
            if (!cart) {
                console.log('Carrito no encontrado:', id);
                throw new Error('Carrito no encontrado');
            }
            return cart;
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            throw new Error('Error al obtener el carrito');
        }
    }

    async createCart() {
        try {
            const newCart = new Cart({ products: [] });
            const savedCart = await newCart.save();
            console.log('Carrito creado:', savedCart);
            return savedCart;
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            throw new Error('Error al crear el carrito');
        }
    }

    async addProductToCart(cartId, productId, quantity) {
        try {
            console.log(`Agregando producto ${productId} al carrito ${cartId} con cantidad ${quantity}`);
            const cart = await Cart.findById(cartId);
            if (!cart) {
                console.log('Carrito no encontrado:', cartId);
                throw new Error('Carrito no encontrado');
            }
    
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
    
            const updatedCart = await cart.save();
            console.log('Producto agregado al carrito:', updatedCart);
            return updatedCart;
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            throw new Error('Error al agregar el producto al carrito');
        }
    }
    
    

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                console.log('Carrito no encontrado:', cartId);
                throw new Error('Carrito no encontrado');
            }

            cart.products = cart.products.filter(p => p.product.toString() !== productId);

            const updatedCart = await cart.save();
            console.log('Producto eliminado del carrito:', updatedCart);
            return updatedCart;
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
            throw new Error('Error al eliminar el producto del carrito');
        }
    }

    async updateCart(cartId, products) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                console.log('Carrito no encontrado:', cartId);
                throw new Error('Carrito no encontrado');
            }

            cart.products = products;

            const updatedCart = await cart.save();
            console.log('Carrito actualizado:', updatedCart);
            return updatedCart;
        } catch (error) {
            console.error('Error al actualizar el carrito:', error);
            throw new Error('Error al actualizar el carrito');
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                console.log('Carrito no encontrado:', cartId);
                throw new Error('Carrito no encontrado');
            }

            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity = quantity;
            } else {
                console.log('Producto no encontrado en el carrito:', productId);
                throw new Error('Producto no encontrado en el carrito');
            }

            const updatedCart = await cart.save();
            console.log('Cantidad de producto actualizada en el carrito:', updatedCart);
            return updatedCart;
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto en el carrito:', error);
            throw new Error('Error al actualizar la cantidad del producto en el carrito');
        }
    }

    async clearCart(cartId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                console.log('Carrito no encontrado:', cartId);
                throw new Error('Carrito no encontrado');
            }

            cart.products = [];

            const updatedCart = await cart.save();
            console.log('Carrito vaciado:', updatedCart);
            return updatedCart;
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
            throw new Error('Error al vaciar el carrito');
        }
    }
}

export default CartManager;
