import React, { useState, useEffect } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import DropDown from './DropDown'
import Brand from './Brand'
import NavbarMenu from './NavbarMenu'
import { Link } from 'react-router-dom'
import NavLink from '../Navbar/NavLink'
import "animate.css/animate.css"
import { cookies } from '../apiRequest/Cookes'
import { useSelector } from 'react-redux'
export default function UserNavbar() {
    const cartProducts = useSelector(state => state.cartProducts)
    const CartIcon = () => {
        return <li className="nav-item"><Link to={'/cart'} className='nav-link' ><i className="fas fa-shopping-cart" />
            {cartProducts.length > 0 ?
                <sup style={{ padding: '5px 8px', border: '1px soild #bc6c25', backgroundColor: '#bc6c25', color: 'white', borderRadius: '50%' }}>
                    {cartProducts.length}</sup> : null}</Link> </li>
    }


    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">

        <Brand  to='/' >
            Click
       </Brand>
        <NavbarMenu >

        </NavbarMenu>
        <ul className="navbar-nav mr-auto">
            <CartIcon />

            {cookies.get('token') ? <DropDown target="dropdown2" name={localStorage.getItem('name')}>
                <NavLink to='/profile/'>Profile</NavLink>
                <NavLink to='/logout' >Logout</NavLink>
              
            </DropDown> :
                <>
                    <NavLink to='/signup'  >Register</NavLink>
                    <NavLink to='/login'  >Login</NavLink>
                </>
            }


        </ul>
    </nav>



    )
}


