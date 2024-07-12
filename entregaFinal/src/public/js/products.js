const socket = io();

socket.on('updateProducts', (products) => {
    const productsFeed = document.getElementById('productsFeed');
    productsFeed.innerHTML = ''; // Clear the current content

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
                <button onclick="addToCart('${product._id}')">Agregar al Carrito</button>
            </div>
        `;
        productsFeed.appendChild(productElement);
    });
});

function addToCart(productId) {
    const cartId = "668eedef44a2b0afd950fbb7"; 

    fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: 1 }) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Producto agregado al carrito",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            console.error('Error al agregar el producto al carrito:', data.message);
        }
    })
    .catch(error => {
        console.error('Error al agregar el producto al carrito:', error);
    });
}
