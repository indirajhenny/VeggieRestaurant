import React from 'react';
import { Container } from "react-bootstrap"
import { AuthProvider } from "../../helpers/auth"
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import Signup from '../SignUpComponents';
import Login from '../LoginComponents';
import Account from './Account';
import EmployeePage from './EmployeePage';
import { auth } from '../../services/firebase';
import PrivateRoute from '../routers/PrivateRoute'
import PublicRoute from '../routers/PublicRoute'

function LoginPage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/signup" component={Signup} />
              <PrivateRoute exact path="/" component={Account} />

            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default LoginPage;
