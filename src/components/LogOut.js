import React, { useState } from 'react';
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../helpers/auth"
import { Link, useHistory } from "react-router-dom"
//import '../../App.css';

/*export default function Account() {
  return <h1 className='cart'>Testing</h1>;
}*/
export default function LogOut() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Button variant="link" onClick={handleLogout}>
          Log Out
      </Button>
    </>
  )
}
