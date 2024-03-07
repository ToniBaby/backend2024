import express from "express";
import { productRouter } from "./routes/products.router.js";


const PORT = 8080;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
});

//Rutas

app.use("/api/products", productRouter);