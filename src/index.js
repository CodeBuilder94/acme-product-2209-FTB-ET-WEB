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
  const [user, setUser] =useState({});

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
        fetch('https://strangers-things.herokuapp.com/api/2209-FBT-ET-WEB-AM/users/login', {
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
        window.localStorage.setItem("token", token); //how to save token to local stroage in browser so the user is not logged out when they refresh.
          fetch('https://strangers-things.herokuapp.com/api/2209-FBT-ET-WEB-AM/users/me', {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
          }).then(response => response.json())
          .then(result => {
            const user = result.data;
            setUser(user);
            console.log(result);
          })
          .catch(console.error);

          })
      .catch(err => console.log(err));

  }

  useEffect(() =>{
    fetch('https://www.acme-api.com/api/products')
    .then( response => response.json())
    .then(json => setProducts(json))
  },[])

  useEffect(()=>{
    const token = window.localStorage.getItem('token');
    if(token)
    {
          fetch('https://strangers-things.herokuapp.com/api//2209-FBT-ET-WEB-AM/users/me', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
    }).then(response => response.json())
      .then(result => {
        const user = result.data;
        setUser(user);
        console.log(result);
      })
      .catch(err => console.log(err));
        }
  },[])

  const logout = () =>{
    window.localStorage.removeItem('token');
    setUser({});
  }


  return (
    <div>
      <h1>React Client Template. Now with Authentication!</h1>
      {
        user._id ? <div>Welcome {user.username}! <button onClick={logout}>LogOut</button></div>:null
      }
      { 
      
        !user._id ? <div>
          <form onSubmit = {register}>
            <input placeholder="username" value = {registerUsername} onChange ={ev => setRegisterUsername(ev.target.value)}></input>
            <input placeholder="password" value = {registerPassword} onChange ={ev => setRegisterPassword(ev.target.value)}></input>
            <button>Register</button>
          </form>
          <form onSubmit = {logIn}>
            <input placeholder="username" value = {loginUsername} onChange ={ev => setLoginUsername(ev.target.value)}></input>
            <input placeholder="password" value = {loginPassword} onChange ={ev => setLoginPassword(ev.target.value)}></input>
            <button>Login</button>
          </form>
        </div> :null
        }
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
