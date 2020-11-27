import React from 'react';
import { Container } from "react-bootstrap"
import { AuthProvider } from "../../helpers/auth"
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import SignUp from '../SignUpComponents';
import Login from '../LoginComponents';
import Account from './Account';
import { auth } from '../../services/firebase';
import PrivateRoute from '../routers/PrivateRoute'
//import PublicRoute from '../routers/PublicRoute'

/*export default function Login() {
  return <h1 className='log-in'>LOGIN</h1>;
}*/


class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }
  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) { // a user IS logged in
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else { // user is NOT logged in
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    })
  }
  // PrivateRoute WILL be included if an employee email is processed
  render() {
    return this.state.loading === true ? <h2>Loading...</h2> : (
      <Router>
        <Switch>
          <PrivateRoute path="/account" authenticated={this.state.authenticated} component={Account}></PrivateRoute>
          <PublicRoute path="/signup" authenticated={this.state.authenticated} component={SignUp}></PublicRoute>
          <PublicRoute path="/log-in" authenticated={this.state.authenticated} component={Login}></PublicRoute>
          <Redirect to="/log-in" />
        </Switch>
      </Router>
    );
  }
}

export default LoginPage;
