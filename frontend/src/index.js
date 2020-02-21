import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css'
import Register from './components/inputForm'
import Home from './components/home'
import NotFound from './components/notFound'
import User from './components/users'
import Navbar from './components/navbar'
import ProductForCustomer from './components/productForCustomer'
import Vendor from './components/vendor'
import Users from './components/showUsers'
import Login from './components/login'
import Customer from './components/customer'
import BuyItem from './components/buyItem'
import OrderHistory from './components/orderHistory'
import { Route, Link , IndexRoute, BrowserRouter, Switch, Router, NavLink } from 'react-router-dom'
ReactDOM.render(
    (<BrowserRouter >
        <div>
            {/* <Navbar /> */}
            {/* <hr /> */}
        <div class="container p-3 my-3">
        <Switch>
        <Route exact path='/' component={Login} />
        {/* <Route path='/register' component={Register}/> */}
        <Route path="/user" component={User}/>
        <Route path='/vendor' component={Vendor} />
        <Route path='/register' component={Register} />
        <Route path='/customer' component={Customer} />
        <Route path='/buyitem' component={BuyItem} />
        <Route path='/orderhistory' component={OrderHistory} />
        <Route component={NotFound} />
        </Switch>
        </div>
        </div>
    </BrowserRouter>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
