import React from 'react';
// Importamos link para usar Link de react router dom
import {Link} from 'react-router-dom';


// Recibimos product procedente del mapeo de Product.js
function ProductList({product}){

    
// Funcion para eliminar un producto de la lista
    const eliminarProducto = (id) =>{
        console.log("eliminando");

    }

    return(
        <li data-category={product.categoria} className= "list-group-item d-flex justify-content-between align-items-center">
            <p>
                {product.nombrePlatillo} {''}
                <span className= "font-weight-bold">${product.precioPlatillo}</span>
            </p>
            <div>
                <Link 
                to={`/Products/Edit/${product.id}`}
                className = "btn btn-success mr-2"
                >Editar</Link>

                <button
                type = "button"
                className = "btn btn-danger"
                onClick = {()=> eliminarProducto(product.id)}
                >Eliminar &times;
                </button>
                
            </div>

        </li>
    )
}


export default ProductList;