import fs from "fs";
import path from "path";    
import __dirname from "../utils.js"

class CartManager {

    constructor(pathFile){
        this.path = path.join(__dirname,`/files/${pathFile}`);
    }

    // Método para obtener la lista de carritos
    getCarts = async ()=>{
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const  carts = JSON.parse(data);
            return carts;
        }else{
            return[];
        }
    }

    // Método para crear un nuevo carrito
    createCarts = async (cart)=>{
        const carts = await this.getCarts();
        // Asignar un nuevo ID al carrito
        if(carts.length === 0){
            cart.id = 1;
        }else{
            cart.id = carts[carts.length-1].id + 1 ;
        }

        // Agregar el carrito a la lista y guardarla en el archivo
        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts,null,'\t'))
        return carts;
    }

    // Método para actualizar un carrito existente
    updateCart = async (cartId, updatedCart) => {
        const carts = await this.getCarts();
        const index = carts.findIndex(cart => cart.id === cartId);
        if (index === -1) {
            console.error('Carrito no encontrado');
            return null;
        }

        // Actualizar el carrito y guardar la lista actualizada en el archivo
        const updated = { ...carts[index], ...updatedCart };
        carts[index] = updated;
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return updated;
    }

    // Método para eliminar un carrito
    deleteCart = async (cartId) => {
        const carts = await this.getCarts();
        const index = carts.findIndex(cart => cart.id === cartId);
        if (index === -1) {
            console.error('Carrito no encontrado');
            return null;
        }

        // Eliminar el carrito de la lista y guardar la lista actualizada en el archivo
        const deletedCart = carts.splice(index, 1)[0];
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return deletedCart;
    }
}

export {CartManager};
