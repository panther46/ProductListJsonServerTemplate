import React, {Fragment} from 'react';
import ProductList from './ProductList'

// PRODUCT PAGE
// Mapeamos el componente de la lista, le asignamos un key y le pasamos el product, variable que obtiene del callback del metodo map.
function Products({products}){

    return(
        <Fragment>
            <h1 className = "text-center">Products</h1>
            <ul className = "list-group mt-5">
                {products.map(product =>(
                    <ProductList
                        key = {product.id}
                        product = {product}
                    />

                ))}
            </ul>
        </Fragment>
        
    )
}

export default Products;
