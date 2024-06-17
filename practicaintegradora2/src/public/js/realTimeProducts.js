// Establecer conexión con el servidor WebSocket
const socket = io();

// Escuchar eventos de productos actualizados y actualizar el DOM
socket.on('updateProducts', (products) => {
    const container = document.getElementById('productsFeed');
    container.innerHTML = ''; // Limpiar el contenedor
    products.forEach(product => {
        container.innerHTML += `
            <div>
                <h3>${product.title}</h3>
                <img src="${product.thumbnail}" alt="imagen de ${product.title}">
                <div>
                    <p>${product.description}</p>
                    <p>Precio: ${product.price}</p>
                    <p>Stock: ${product.stock}</p>
                    <p>Código: ${product.code}</p>
                </div>
            </div>
        `;
    });
});

// Manejar el envío del formulario para agregar un nuevo producto
document.getElementById('productForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: document.getElementById('price').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    socket.emit('newProduct', product); // Enviar los datos del nuevo producto al servidor
});
