import React from 'react';
import {Link} from 'react-router-dom'; //indispensable para crear links usando routing


function Header(){
    return(
        <nav className = "navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to = "/products" className= "navbar-brand">
 
                </Link>
                
            </div>
        </nav>

    )
}

export default Header;