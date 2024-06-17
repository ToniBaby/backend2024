import { Router } from "express";
import ProductManagerFile from "../managers/productsManager.js";

const router = Router();
const productManagerFile = new ProductManagerFile("products.json");

router.get("/", async (req, res) => {
    try {
        const products = await productManagerFile.getProducts();
        res.render("realTimeProducts", { title: "Productos en Tiempo Real", products });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al obtener productos" });
    }
});

export default router;
