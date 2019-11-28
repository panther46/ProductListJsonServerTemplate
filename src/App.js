import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from  'react-router-dom';
import Products from './Components/Products';
import AddProduct from './Components/AddProduct';
import EditProduct from './Components/EditProduct';
import Product from './Components/Product';
import Header from './Components/Header';




function App() {


  const [products, setProducts] = useState([]);
  // State wrapper externo para refrescar pagina con contenido insertado en la db.
  const [productReloading, setProductReloadingState] = useState(true);

  useEffect(() =>{
    const consultarApi = async () =>{ 
      // realizamos consulta a api de json-server (fake local port 4.000)
      // If integrado para el state wrapper
      if (productReloading){
        const resultado = await axios.get('http://localhost:4000/restaurant');
      setProducts(resultado.data);
      }
    }
    consultarApi();
    // Cambiando a false el estado wrapper ProductReloading
    setProductReloadingState(false);
  },[productReloading]); // Dependencia del state "wrapper"

  return (
    <Router>
      <Header/>
      <main className = "container mt-5">
      <Switch>
        <Route exact path= "/new-Product" render= {()=>(<AddProduct setProductReloadingState = {setProductReloadingState}/>)} /> // el return en esta funcion es implicito
        <Route exact path= "/Products" render= { ()=>(<Products products ={products}/>)} /> // el return en esta funcion es implicito
        <Route exact path= "/Products/:id" component= {Products} />
        <Route exact path= "/Products/Edit/:id" render = {props =>{                 
          // Tomar el id del producto y convertirlo a int
          const idProductInt = parseInt(props.match.params.id);
          // El producto que se pasa al state con metodo fitler, devuelve un nuevo array
          const producto = products.filter(producto => producto.id === idProductInt);   // parametros de filter "producto nuevo nombre de variable, itera sobre id de producto nuevo nombre de variable"

          return(
            <EditProduct
            producto = {producto[0]}
            setProductReloadingState = {setProductReloadingState}
            
            />
          )
        }} />
         
      </Switch>
      <p className = "mt-4 p2 text-center">Todos los derechos reservados</p>
      </main>
    </Router> 

    // recordar: para pasar datos a componentes bajo routing es necesario la funcion render, cuando no hay datos simplemetnte un prop dentro del router.
      
  );
}

export default App;
