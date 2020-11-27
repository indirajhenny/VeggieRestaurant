import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../../services/firebase';

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/cart' />}
    />
  )
}

export default PublicRoute;
