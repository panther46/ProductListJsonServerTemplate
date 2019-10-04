import React from 'react';
import {Link} from 'react-router-dom'; //indispensable para crear links usando routing, esto compila e imprime links convencionales.


function Header(){
    return(
        <nav className = "navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to = "/products" className= "navbar-brand">
                    Json server and Routing
                </Link>

                <ul className= "navbar-nav mr-auto">
                    <li className= "nav-item"></li>
                        <Link to = '/products' className= "nav-link">Products</Link>
                        <Link to = '/new-Product' className= "nav-link">Add new Product</Link>

                </ul>
                
            </div>
        </nav>

    )
}

export default Header;