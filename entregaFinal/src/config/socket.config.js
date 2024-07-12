import { Server } from "socket.io";
import ProductManager from "../managers/productManager.js";

const productManager = new ProductManager();

const config = (serverHTTP) => {
    const serverIO = new Server(serverHTTP);

    serverIO.on("connection", (socket) => {
        console.log("Cliente conectado");

        socket.on('newProduct', async (product) => {
            try {
                await productManager.addProduct(product);
                const products = await productManager.getProducts();
                serverIO.emit('updateProducts', products.docs);
            } catch (error) {
                console.error("Error al agregar producto:", error);
            }
        });
    });
};

export default { config };
