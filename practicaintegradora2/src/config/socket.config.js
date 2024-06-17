import { Server } from "socket.io";
import ProductManagerFile from "../managers/productsManager.js";

const productManagerFile = new ProductManagerFile("products.json");

const config = (serverHTTP) => {
    const serverIO = new Server(serverHTTP);

    serverIO.on("connection", (socket) => {
        console.log("Conexión establecida");

        // Manejar el evento 'newProduct' para agregar un nuevo producto
        socket.on('newProduct', async (product) => {
            try {
                await productManagerFile.addProduct(product);
                const products = await productManagerFile.getProducts();
                serverIO.emit('updateProducts', products); // Emitir evento a todos los clientes conectados
            } catch (error) {
                console.error("Error al agregar producto:", error);
            }
        });
    });
};

export default { config };
