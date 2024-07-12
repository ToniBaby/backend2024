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
            </div>
        `;
        productsFeed.appendChild(productElement);
    });
});
