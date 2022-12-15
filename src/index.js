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
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const register = (ev) =>
  {
    ev.preventDefault();
      fetch('https://strangers-things.herokuapp.com/api/2209-FBT-ET-WEB-AM/users/register', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        username: registerUsername,
        password: registerPassword
      }
    })
  }).then(response => response.json())
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
  }

  const logIn = (ev) =>
  {
    ev.preventDefault();
        fetch('https://strangers-things.herokuapp.com/api/COHORT-NAME/users/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: loginUsername,
          password: loginPassword
        }
      })
    }).then(response => response.json())
      .then(result => {
        const token = result.data.token;
        console.log(result);
      })
      .catch(err => console.log());

  }

  useEffect(() =>{
    fetch('https://www.acme-api.com/api/products')
    .then( response => response.json())
    .then(json => setProducts(json))
  },[])

  return (
    <div>
      <h1>React Client Template. Now with Authentication!</h1>
      <form onSubmit = {register}>
        <input placeholder="username" value = {registerUsername} onChange ={ev => setRegisterUsername(ev.target.value)}></input>
        <input placeholder="password" value = {registerPassword} onChange ={ev => setRegisterPassword(ev.target.value)}></input>
        <button>Register</button>
      </form>
      <form onSubmit = {logIn}>
        <input placeholder="username" value = {loginUsername} onChange ={ev => setLoginUsername(ev.target.value)}></input>
        <input placeholder="password" value = {loginPassword} onChange ={ev => setLoginPasword(ev.target.value)}></input>
        <button>Login</button>
      </form>
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
