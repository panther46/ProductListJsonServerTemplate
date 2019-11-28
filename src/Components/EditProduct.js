import React, {useState, useRef} from 'react';
import Error from './error';
// Libreria para conexion con api
import axios from 'axios';
// Libreria para alertas
import Swal from 'sweetalert2';
// creaction  de HOC redireccion de usuarios con history, recordar modificar export default y ejecutar [history.push('/Products');]
import {withRouter} from 'react-router-dom';

function EditProduct(props) {

    // destructuring de props
    const {history, producto, setProductReloadingState} = props;

    // generando refs
    const precioPlatilloRef = useRef('');
    const nombrePlatilloRef = useRef('');

    // estados locales del componente
    const [error, setError] = useState(false);
    const [categoria, setCategoria] = useState('');

    const editarProducto = async (e) =>{
        e.preventDefault();

        // revisar si hay algun cambio en los campos

        let categoriaPlatillo = (categoria === '') ? producto.categoria : categoria;

        // Obteniendo los valores del formulario
        const editarPlatillo = {
            precioPlatillo: precioPlatilloRef.current.value,
            nombrePlatillo: nombrePlatilloRef.current.value,
            categoria: categoriaPlatillo,
        }

        // enviando request para edición
         const url = `http://localhost:4000/restaurant/${producto.id}`;

         try{
             const resultado = await axios.put(url, editarPlatillo);
             if(resultado.status === 200){
                Swal.fire(
                    'Bien!',
                    'Producto editado!',
                    'success'
                  )
            }

         }
         catch{
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal, vuelve a intentarlo',
         })

    }
    // State que actua como wrapper para hacer refresh en la pagina principal de producto
    setProductReloadingState(true);
    // Re dirigiendo usuario a pagina principal de producto
    history.push('/Products')
}


    return(
        <div className="col-md-8 mx-auto " onSubmit = {editarProducto}>
            <h1 className="text-center">Editar Producto</h1>
            {(error) ? <Error mensaje="Todos los campos son obligatorios"/>:null}

            <form className="mt-5">
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Platillo"
                        ref = {nombrePlatilloRef}
                        defaultValue = {producto.nombrePlatillo}
                        
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Platillo"
                        ref = {precioPlatilloRef}
                        defaultValue = {producto.precioPlatillo}
                        
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="postre"
                        onChange = {e => setCategoria(e.target.value)}
                        defaultChecked = {(producto.categoria === 'postre')}
                    />
                    <label className="form-check-label">
                        Postre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="bebida"
                        onChange = {e => setCategoria(e.target.value)}
                        defaultChecked = {(producto.categoria === 'bebida')}
                    />
                    <label className="form-check-label">
                        Bebida
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="cortes"
                        onChange = {e => setCategoria(e.target.value)}
                        defaultChecked = {(producto.categoria === 'cortes')}
                    />
                    <label className="form-check-label">
                        Cortes
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="ensalada"
                        defaultChecked = {producto.categoria === 'ensalada'}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
            </form>
        </div>
    )
}

export default withRouter(EditProduct);