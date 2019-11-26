import React, {useState} from 'react';
import Error from './error';
import axios from 'axios';
import Swal from 'sweetalert2';
// creaction  de HOC redireccion de usuarios con history, recordar modificar export default y ejecutar [history.push('/Products');]
import {withRouter} from 'react-router-dom';



function AddProduct({history,setProductReloadingState}){

    // States locals del form
    const [nombrePlatillo, setNombrePlatillo] = useState('');
    const [precioPlatillo, setPrecioPlatillo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [error, setError] = useState(false);



    // Metodo principal de Submit. 
    const agregarProducto = async e =>{
        e.preventDefault();

        if (nombrePlatillo === '' || precioPlatillo === ''  || categoria === ''){
            setError(true);
            return; // Para hacer stop en ejecución
        }

        setError(false);

        // Crear el nuevo producto con un try & catch, usamos object ehanced los objetos tienen el mismo nombre.
        try{
            const resultado = await axios.post('http://localhost:4000/restaurant',{
                nombrePlatillo,
                precioPlatillo,
                categoria
            });
            console.log(resultado);
            //Condicional para modal con SweetAlert2 si todo es ok (mensaje 201 de status, ejecuta el swal):
            if(resultado.status === 201){
                Swal.fire(
                    'Bien!',
                    'Producto añadido!',
                    'success'
                  )
            }
        } catch (error){
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal, vuelve a intentarlo',
              })

        }
        // setting del state wrapper a true 
        setProductReloadingState(true);
        // pasando el historial al objeto history
        history.push('/Products');
        

    }

    return(
        <div className="col-md-8 mx-auto " onSubmit = {agregarProducto}>
            <h1 className="text-center">Agregar Nuevo Producto</h1>
            {(error) ? <Error mensaje="Todos los campos son obligatorios"/>:null}

            <form className="mt-5">
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Platillo"
                        onChange = {e => setNombrePlatillo(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Platillo"
                        onChange = {e => setPrecioPlatillo(e.target.value)}
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
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>
    )

    }
// HOC WithRouter para redireccionar al usuario
export default withRouter(AddProduct);
