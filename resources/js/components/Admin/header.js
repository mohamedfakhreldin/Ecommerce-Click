import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <div>
<nav className="main-header navbar navbar-expand navbar-white navbar-light">
  {/* Left navbar links */}
  <ul className="navbar-nav">
    <li className="nav-item">
      <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      <Link to="/admin" className="nav-link">Home</Link>
    </li>

  </ul>


</nav>


            </div>
        )
    }
}
