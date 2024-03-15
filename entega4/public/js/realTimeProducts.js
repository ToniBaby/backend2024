const socket = io();
socket.on('newProduct', (product)=>{
    //agregar el nuevo producto al html

    const container = document.getElementById('productsFeed')

    container.innerHTML +=`

    <div>
        <h3> ${product.title} </h3>
            <img src=" ${product.thumbnail} " alt="imagen de ${product.title} ">
            <div>
                <p> ${product.description} </p>
                <p>Precio: ${product.price} </p>
                <p>Stock: ${product.stock} </p>
                <p>Codigo: ${product.code} </p> 
            </div>
    </div>
    
    `
})







