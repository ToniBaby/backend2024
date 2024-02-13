class ProductManager {

    constructor(){

        this.products = [] ;
    }
    
    
    addProduct = (title, description, price, thumbnail, code, stock)=> {

        let id = this.products.length;


        if (!title || !description || !price || !thumbnail || !code || !stock) {
          return 'Todos los campos son obligatorios';
        }

        const productExists = this.products.find( product => product.code === code);


        if (productExists) {
          return `El producto ya existe: ${code}`;
        }
        
        const product = {
          id,
          title,
          description,
          price,
          thumbnail,
          code: ++id,
          stock,
        };
    
        this.products.push(product);
        return this.products;
    }
    getProducts =()=> {
        return this.products;
      }

      getProductById=(idProduct)=> {
        const product = this.products.some(product => product.id === idProduct);
    
        if (!product) {
          console.error('Producto no encontrado');
        }
    
        return product;
      }

   
   
}


const productManager = new ProductManager();

const producto1 = productManager.addProduct('tv','electrodomestico', 25000,'imagen1.jpg', 'A1', 50);
const producto2 = productManager.addProduct('pc', 'electrodomestico', 15, 'imagen2.jpg', 'A2', 30);


console.log('Productos agregados:');
console.log(producto1);
const productoEncontrado = productManager.getProductById(1);
console.log('Producto encontrado por id:');
console.log(productoEncontrado);

const productoNoEncontrado = productManager.getProductById(3);


console.log(productoNoEncontrado);