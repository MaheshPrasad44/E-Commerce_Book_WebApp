import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import Register from '../src/components/register/register';
import Login from '../src/components/login/login';
import Profile from '../src/components/profile/profile';
import Home from '../src/components/home/home';
import Logout from '../src/components/logout/logout';
import MyBooks from '../src/components/mybooks/mybooks';
import Mycart from '../src/components/mycart/mycart';
import Purchase from '../src/components/purchase/purchase';

import Reset from '../src/components/reset/reset';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar  sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="">Cloud</Navbar.Brand>
 
    <Nav className="mr-auto">
    {
      (sessionStorage.getItem("userId") === "" || sessionStorage.getItem("userId") === undefined || sessionStorage.getItem("userId") ===null)
      ?
      <Nav.Link href="/login">Login</Nav.Link>
    
      :
      <Nav.Link href="/logout">logout</Nav.Link>
    }
   {
      (sessionStorage.getItem("userId") === "" || sessionStorage.getItem("userId") === undefined || sessionStorage.getItem("userId") ===null)
      ?
      <Nav.Link href="/register">Register</Nav.Link>
    
      :
      <Nav.Link ></Nav.Link>
    }
   
    {/* <Nav.Link href="/home">Home</Nav.Link> */}
    <Nav.Link href="/profile">Profile</Nav.Link>
    <Nav.Link href="/mybooks">My Books</Nav.Link>
    <Nav.Link href="/purchase">Purchase</Nav.Link>

    <Nav.Link href="/mycart">My Cart</Nav.Link>
    </Nav>
 
</Navbar>
    <Switch>
     <Route path="/register" component={Register} />
     <Route path="/login" component={Login} />
     <Route path="/home" component={Home} />
     <Route path="/profile" component={Profile} />
     <Route path="/logout" component={Logout} />
     <Route path="/mybooks" component={MyBooks} />
     <Route path="/purchase" component={Purchase} />
     <Route path="/mycart" component={Mycart} />
     <Route path="/reset" component={Reset} />
     
     </Switch>
    </div>
  );
}

export default App;
