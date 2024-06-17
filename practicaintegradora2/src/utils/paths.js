import { fileURLToPath } from 'url';
import Path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

// Navega dos niveles hacia arriba desde utils para llegar al directorio raíz
const rootDir = Path.join(__dirname, '../../');

const paths = {
    root: rootDir,
    src: Path.join(rootDir, 'src'),
    public: Path.join(rootDir, 'src', 'public'),
    views: Path.join(rootDir, 'src', 'views'),
    files: Path.join(rootDir, 'src', 'files'), 
};

export default paths;
