import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

  
    async function register(e) {
  
      e.preventDefault()
      
      const loginData = {
        username: username,
        email:email,
        password: password
      }
  
      const data = await axios.post("https://forstobackend.onrender.com/api/register", loginData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
  
      console.log(data.data)
    }

  return (
     <div className='register_container'>
      <h3>Admin Login</h3>
      <div className='form_container'>
        <form onSubmit={register}>
          <input type='text' placeholder='username' onChange={(e => { setUsername(e.target.value) })} required={true} />
          <input type='email' placeholder='email' onChange={(e => { setEmail(e.target.value) })} required={true} />
          <input type='password' placeholder='password' onChange={(e) => { setPassword(e.target.value) }} required={true} />
          <button type='submit'>Register</button>
        </form>
      </div>
    <p>if already register? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Register
