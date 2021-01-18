import React, { Component } from 'react'
import axios from 'axios'
import { Link, BrowserRouter as Router } from 'react-router-dom'
export function TreeList(props) {
    return (
        <li className="nav-item has-treeview">
            <a href="#" className="nav-link">
                <i className={"nav-icon" + props.icon ? props.icon : ''} />
                <p>
                    {props.title ? props.title : 'Title'}
                    <i className="fas fa-angle-left right" />
                </p>
            </a>
            <ul className="nav nav-treeview">
                {props.children}
            </ul>
        </li>
    )
}
export function MenuLink(props) {
    return (

        <li className="nav-item">
            {props.hyperlink ?

                <a href={props.to} className='nav-link'>
                    <i className={props.icon ? props.icon + " nav-icon" : 'far fa-circle nav-icon'} />

                    <p>{props.title}</p>
                </a>

                :


                <Link to={props.to} className='nav-link'>
                    <i className={props.icon ? props.icon + " nav-icon" : 'far fa-circle nav-icon'} />

                    <p>{props.title}</p>
                </Link>
            }
        </li>
    )
}
export default class Menu extends Component {
    componentDidMount() {
        axios.get('http://localhost:8000/admin/user/data').then(res => {

            this.setState({
                name: res.data.name,
                email: res.data.email
            })
        })
    }
    state = {

    }
    render() {
        return (
            <div>
                <aside className="main-sidebar sidebar-light-primary elevation-4">
                    {/* Brand Logo */}
                    <Link href="/admin" className="brand-link">
                        <img src="/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light">AdminLTE 3</span>
                    </Link>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="/img/abstract-user-flat-4.png" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <Link to="/admin" className="d-block">{this.state.name}</Link>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}


                                <TreeList title='Tables' icon="fas fa-table">

                                    <MenuLink to='/admin/tables/users' title='Users' icon='far fa-user' />
                                    <MenuLink to='/admin/tables/admins' title='Admins' icon='far fa-user' />
                                    <MenuLink to='/admin/tables/trademarks' title='Trademarks' icon='fas fa-trademark' />
                                    <MenuLink to='/admin/tables/stores' title='Stores' icon='fas fa-store' />
                                    <MenuLink to='/admin/tables/categories' title='Categories' />
                                    <MenuLink to='/admin/tables/colors' title='Colors' icon='fas fa-paint-brush' />
                                    <MenuLink to='/admin/tables/products' title='Products' icon='fas fa-circle' />
                                </TreeList>
                                <MenuLink hyperlink to='/admin/logout' title='Sign Out' icon='fas fa-sign-out-alt' />

                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>


            </div>
        )
    }
}
