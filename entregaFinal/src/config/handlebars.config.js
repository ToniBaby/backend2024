import { engine } from 'express-handlebars';
import express from 'express';
import paths from '../utils/paths.js';

const config = (serverHTTP) => {
    serverHTTP.engine('handlebars', engine({
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    }));
    serverHTTP.set('views', paths.views);
    serverHTTP.set('view engine', 'handlebars');
    serverHTTP.use(express.static(paths.public)); // Servir archivos estáticos desde la carpeta 'public'
};

export default { config };
