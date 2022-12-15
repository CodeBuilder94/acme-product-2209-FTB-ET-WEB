import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import {useLocation, HashRouter, Routes, Route, Link} from 'react-router-dom';
import Products from './Products';
import Product from './Product';
//import Nav from './Nav';

const Nav = (props) =>
{
  const products = props.products;
  const location = useLocation();
  const pathname = location.pathname;

 return <nav>
        <Link to='/home' className={pathname === '/' ?"Selected" :""}>Home</Link>
        <Link to ='/products' className={pathname.startsWith('/products') ?"Selected" :""}>Products ({products.length})</Link>
    </nav>
}

const App = ()=> {
  
  const [products, setProducts] = useState([]);

  useEffect(() =>{
    fetch('https://www.acme-api.com/api/products')
    .then( response => response.json())
    .then(json => setProducts(json))
  },[])

  return (
    <div>
      <h1>React Client Template</h1>
      <Routes>
        <Route path='/*' element ={
          <Nav products={products}/>
        }
        />
      </Routes>
      <Routes>
        <Route path='/home' element= { <div>Home</div>}/>
        <Route path="/products" element= { <Products products={products}/>} />
        <Route path= '/products/:id' element ={
          <Product products={products}/>
        } />
      </Routes> 
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
