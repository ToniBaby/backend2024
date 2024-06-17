import fs from "fs";
import path from "path";    
import __dirname from "../utils/utils.js"

class CartManagerFile {

    constructor(pathFile){
        this.path = path.join(__dirname, `/files/${pathFile}`);
    }

    getCarts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    getCartById = async (id) => {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === id);
    }

    createCart = async () => {
        const carts = await this.getCarts();
        const newCart = { id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1, products: [] };
        carts.push(newCart);

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return newCart;
    }

    addProductToCart = async (cartId, productId) => {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === cartId);

        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const productInCart = cart.products.find(p => p.product === productId);
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return cart;
    }
}

export default CartManagerFile;
