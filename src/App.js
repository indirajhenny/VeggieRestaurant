import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/pages/Home'
import Menu from './components/pages/Menu'
import Login from './components/pages/LoginPage'
import Tracker from './components/pages/Tracker'
import Cart from './components/pages/Cart'
import Account from './components/pages/Account'
import EmployeePage from './components/pages/EmployeePage'
import OrderConfirmation from './components/pages/OrderConfirmation'
import PrivateRoute from './components/routers/PrivateRoute'
import PublicRoute from './components/routers/PublicRoute'
import { AuthProvider } from "./helpers/auth"


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// add PrivateRoute for EmployeePage
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <AuthProvider>
          <Switch>
            <Route path='/' exact component = {Home} />
            <Route path='/menu' exact component = {Menu} />
            <Route path='/tracker' exact component = {Tracker} />
            <Route path='/cart' exact component = {Cart} />
            <PublicRoute path='/login' exact component = {Login} />
            <PrivateRoute path='/account' exact component = {Account} />
            <PrivateRoute path='/employeepage' exact component={EmployeePage} />
            <PrivateRoute path='/orderconfirm' exact component = {OrderConfirmation} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
