import React from 'react';
// Importamos link para usar Link de react router dom
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


// Recibimos product procedente del mapeo de Product.js
function ProductList({product, setProductReloadingState}){

    
// Funcion para eliminar un producto de la lista, usamos swal para el modal de confirmacion
    const eliminarProducto = (id) =>{
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto eliminado no se podra recuperar luego!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then(async(result) => {    // async 
            if (result.value) {
                try{
                // Enviamos la peticion de eliminar aqui:
                const url = `http://localhost:4000/restaurant/${id}`;
                // resultado con .delete:
                const resultado = await axios.delete(url);
                if (resultado === 200){
                    Swal.fire(
                        'Eliminado!',
                        'El Producto se ha eliminado',
                        'success'
                      )
                      // Consultar la api nuevamente:
                      setProductReloadingState(true);
                    }
                    
                }catch(error){
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo salio mal, vuelve a intentarlo'
                          })
                    }
                }

              
          })

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