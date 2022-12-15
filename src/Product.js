import React from 'react';
import {Link} from 'react-router-dom';

const Product = (props) => {
    const products = props.products;
    const id = useParams().id;
    const product = products.find(product => product.id ===id); //how to find an item based on seach parameters.
    if(!product)
    {
      return null;
    }
    return(
      <div>
        <h1><Link to ='/products'>{product.name}</Link></h1>
        <p>{product.description}</p>
      </div>
    )
  }

  export default Product;