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

  useEffect(() =>{
    const consultarApi = async () =>{
      // realizamos consulta a api de json-server (fake local port 4.000)
      const resultado = await axios.get('http://localhost:4000/restaurant');

      console.log(resultado) 
    }

    consultarApi();
  },[]);

  return (
    <Router>
      <Header/>
      <main className = "container mt-5">
      <Switch>
        <Route exact path= "/new-Product" component= {AddProduct} />
        <Route exact path= "/Products" component= {Products} />
        <Route exact path= "/Products/:id" component= {Product} />
        <Route exact path= "/Products/Edit/:id" component= {EditProduct} />
         
      </Switch>
      <p className = "mt-4 p2 text-center">Todos los derechos reservados</p>
      </main>
    </Router> 
      
  );
}

export default App;
