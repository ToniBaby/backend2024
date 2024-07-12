import { connect, Types } from "mongoose";

const connectDB = () => {
    const URI = "mongodb+srv://ToniBaby:Locoloco22@cluster0.zz4vor2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    const options = {
        dbName: "ProductManager"
    };

    connect(URI, options)
        .then(() => console.log("Conectado a MongoDB"))
        .catch((err) => console.error("Error al conectar con MongoDB", err));
};

const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};

export default {
    connectDB,
    isValidID,
};
