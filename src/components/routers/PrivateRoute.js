import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../../helpers/auth"
import EmployeePage from '../pages/EmployeePage';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        if (currentUser != null){
          let userEmail = currentUser.email;
          //console.log(userEmail)
          if (userEmail.includes("@veggierst.com")) {
            console.log("Employee has signed in")
            return currentUser ? <EmployeePage/>: <Redirect to="/login" />
          }
          else {
            //console.log("Customer has signed in")
            return currentUser ? <Component {...props} /> : <Redirect to="/login" />
          }
        }
      }}
    ></Route>
  )
}
