import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../../services/firebase';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/log-in', state: { from: props.location } }} />}
    />
  )
}

export default PrivateRoute;
