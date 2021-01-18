import React, { useEffect } from 'react'
import NavLink  from '../Navbar/NavLink'
import Brand from '../Navbar/Brand'
import { Route } from 'react-router'
import StoreHome from './StoreHome'
import StoreProductsHome from './StoreProducts/StoreProductsHome'
import StoreProductCreate from './StoreProducts/StoreProductCreate'
import { apiRequest } from '../apiRequest/APIFunction'
import StoreProductEdit from './StoreProducts/StoreProductEdit'
import OrderHome from './Orders/OrderHome'
import { catchingErrors } from '../apiRequest/catch'
import EditStore from './EditStore'
import Footer from '../Footer'
import { SessionFlushMessage } from '../apiRequest/SessionFlush'
export default function StoreDashboard() {
    document.title='Store'
    // useEffect(() => {
    //    apiRequest('store/'+localStorage.getItem('id')).catch(errors=>catchingErrors(errors))
    // }, [])
    return (
        <>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<Brand to='/store/dashboard/home' >
Store
</Brand>
<div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">

        <NavLink to='/store/dashboard/products' >
        Products
    </NavLink>
    <NavLink to='/store/dashboard/orders' >
     Orders
    </NavLink>
    <NavLink to='/store/dashboard/edit' >
        Store Edit
    </NavLink>
    <NavLink to='/' >
      Back to website
    </NavLink>
        </ul>

</div>
</nav>
<div className={'container main-container'} >
  <SessionFlushMessage messageName='success' />
    <Route path='/store/dashboard/'  exact component={StoreHome}/>
    <Route path='/store/dashboard/orders/'  exact component={OrderHome}/>
    <Route path='/store/dashboard/products' exact  component={StoreProductsHome}/>
    <Route path='/store/dashboard/edit' exact  component={EditStore}/>
    <Route path='/store/dashboard/product/create' exact  component={StoreProductCreate}/>
    <Route path='/store/dashboard/product/edit/:id' exact  component={StoreProductEdit}/>

</div>
<Footer />
        </>
    )
}
