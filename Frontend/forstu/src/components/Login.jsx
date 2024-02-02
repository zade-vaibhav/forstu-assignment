import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [error_type, setError] = useState("")

  async function login(e) {

    e.preventDefault()

    const loginData = {
      username: username,
      password: password
    }

    try {
      const data = await axios.post("http://localhost:3002/api/login", loginData, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      setError("")
      
    } catch (err) {
      setError(err.response.data.message)
    }


  }

  return (
    <div className='login_container'>
      <h3>Admin Login</h3>
      <div className='form_container'>
        <form onSubmit={login}>
          <input type='text' placeholder='username' onChange={(e => { setUsername(e.target.value) })} required={true} />
          <input type='password' placeholder='password' onChange={(e) => { setPassword(e.target.value) }} required={true} />
          <button type='submit'>login</button>
        </form>
        {
          error_type && <p style={{ color: "red" }}>* {error_type}</p>
        }
      </div>
      <p>if not register? <Link to="/register">Register</Link></p>
    </div>
  )
}

export default Login
