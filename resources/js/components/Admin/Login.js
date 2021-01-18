import React, { Component, useState } from 'react'
import Axios from 'axios'
import {  SessionFlushErrorMessage } from '../Users/apiRequest/SessionFlush'
export default function Login(props)  {
  const [error, setError] = useState(false)
  const [data, setData] = useState({})
const login =(e)=>{
  e.preventDefault()
  Axios.post('/admin/login',data).then(()=>window.location='/admin').catch(error=>setError(error.response.data))
}
const handleChange = (e)=>setData({...data, [e.target.name]:e.target.value})

        return (
     <div className="login-box">
  <div className="login-logo">
    <a h><b>Admin</b>LTE</a>
  </div>
  {/* /.login-logo */}
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Sign in to start your session</p>
      <form method="post" onSubmit={login}>

{error?<SessionFlushErrorMessage messageName={error}/>:null}
        <div className="input-group mb-3">
          <input onChange={handleChange} name="email" type="email" className="form-control" placeholder="Email" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input onChange={handleChange} name="password" type="password" className="form-control" placeholder="Password" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>


          {/* /.col */}
          <div className="col-4">
            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
          </div>
          {/* /.col */}

      </form>

    </div>
    {/* /.login-card-body */}
  </div>
</div>

        )
    }
