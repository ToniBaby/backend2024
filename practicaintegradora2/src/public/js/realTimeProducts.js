const socket = io();

// Escuchar eventos desde el servidor
socket.on('updateProducts', (products) => {
    const productsFeed = document.getElementById('productsFeed');
    productsFeed.innerHTML = ''; // Limpiar contenido actual
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
            <h3>${product.title}</h3>
            <img src="${product.thumbnail}" alt="imagen de ${product.title}">
            <div>
                <p>${product.description}</p>
                <p>Precio: ${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <p>Código: ${product.code}</p>
            </div>
        `;
        productsFeed.appendChild(productElement);
    });
});

// Enviar nuevo producto al servidor
document.getElementById('productForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const product = {
        title: formData.get('title'),
        description: formData.get('description'),
        code: formData.get('code'),
        price: formData.get('price'),
        stock: formData.get('stock'),
        category: formData.get('category'),
        thumbnail: formData.get('thumbnail')
    };
    socket.emit('newProduct', product);
});
