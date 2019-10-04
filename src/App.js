import React from 'react';
import {BrowserRouter as Router, Route, Switch} from  'react-router-dom';
import Products from './Components/Products';
import AddProduct from './Components/AddProduct';
import EditProduct from './Components/EditProduct';
import Product from './Components/Product';
import Header from './Components/Header';


function App() {
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
