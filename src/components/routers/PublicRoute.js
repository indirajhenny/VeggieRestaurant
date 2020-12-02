import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../../helpers/auth"

export default function PublicRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ?
          <Redirect to="/account" /> :
          <Component {...props} />
      }}
    ></Route>
  )
}
