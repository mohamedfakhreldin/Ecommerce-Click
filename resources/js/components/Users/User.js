import React from 'react'
import { Route } from 'react-router'
import UserNavbar from './Navbar/UserNavbar'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import Product from './Products/Product'
import Sidebar from './Sidebar/Sidebar'
import HomeProfile from './Profile/HomeProfile'
import StoreDashboard from './Store/StoreDashboard'
import { BrowserRouter } from 'react-router-dom'
import  store from './ReduxStore/store'

import { logoutRequest } from './apiRequest/APIFunction'
import {Provider} from 'react-redux'
import Cart from './Cart/Cart'
import ProductShow from './Products/ProductShow'
import SignUp from './SignUp'
import Footer from './Footer'
export default function User(props) {

    return (
        <>

    <Provider store={store}>
            <UserNavbar />
            <div className='container-fluid main'>
                <div className='row'>

                    <Sidebar />
                    <div className='col-lg-12 '>

                        <Route path='/' exact component={Home} />
                        <Route path='/cart' exact component={Cart} />
                        <Route path='/profile/'  component={HomeProfile} />
                        <Route path='/login' exact component={Login} />
                        <Route path='/signup' exact component={SignUp} />
                        <Route path = '/logout' exact component = {Logout} />
                        <Route path='/products/:category' exact component={Product} />
                        <Route path='/search' exact component={Product} />
                        <Route path='/product/show/:id' exact component={ProductShow} />
                        
                    </div>

                </div>
            </div>
    </Provider>
<Footer />
        </>
    )

}
