import React, { Component } from 'react'
import Header  from './header';
import  Footer  from './Footer';
import  Menu from './Menu';
import {BrowserRouter as Router ,Link ,Route, Switch, withRouter} from 'react-router-dom'
import Dashboard from './Dashboard';
import Table from './Table'
import Create from './Create';
import Edit from "./Edit/Edit";
import * as EditComponent from "./Edit/EditAll"
import ProductsTable from './Products/ProductsTable';
import ProductShow from './Products/ProductShow';
export default class Admin extends Component {
    render() {
        return (
            <div>




<Header />
           <Menu />
                 {/* Main Component  */}
    <Route path='/admin' exact component={Dashboard} />

                 {/* Users Table Components(Show, Edit, Create)  */}
    <Route path='/admin/tables/users' exact component={()=><Table table='Users' />} />
    <Route path={'/admin/tables/users/:id/edit'} exact component={EditComponent.UserEdit } />
    <Route path='/admin/tables/users/create' exact component={()=><Create table='Users'  />} />

                {/* Admins Table Components(Show, Edit, Create)  */}
    <Route path='/admin/tables/admins' exact component={()=><Table table='Admins'  />} />
    <Route path='/admin/tables/admins/create' exact component={()=><Create table='Admins'  />} />
    <Route path={'/admin/tables/admins/:id/edit'} exact component={()=><EditComponent.AdminEdit  />} />

     {/* Trademarks Table Components(Show, Edit, Create)  */}
     <Route path='/admin/tables/trademarks' exact component={()=><Table table='Trademarks'  />} />
    <Route path='/admin/tables/trademarks/create' exact component={()=><Create table='Trademarks'  />} />
    <Route path={'/admin/tables/trademarks/:id/edit'} exact component={EditComponent.TrademarkEdit } />
     {/* Colors Table Components(Show, Edit, Create)  */}
     <Route path='/admin/tables/colors' exact component={()=><Table table='Colors'  />} />
    <Route path='/admin/tables/colors/create' exact component={()=><Create table='Colors'  />} />
    <Route path={'/tables/colors/:id/edit'} exact component={()=><EditComponent.ColorEdit table='Colors'/> } />
      {/* Stores Table Components(Show, Edit, Create)  */}
      <Route path='/admin/tables/stores' exact component={()=><Table disableCreate sendUpdateSt table='Stores'  />} />
    <Route path={'/admin/tables/stores/:id/edit'} exact component={EditComponent.StoreEdit } />
      {/* Categories Table Components(Show, Edit, Create)  */}
      <Route path='/admin/tables/categories' exact component={()=><Table table='Categories'  related={{parent:'categories'}} />} />
      <Route path='/admin/tables/products' exact component={()=><ProductsTable />} />
    <Route path='/admin/tables/categories/create' exact component={()=><Create hasFile optionsRequest={true} table='Categories'  />} />
    <Route path={'/admin/tables/categories/:id/edit'} exact component={EditComponent.CategoryEdit } />

    <Route path={'/admin/product/show/:id'} exact component={ProductShow} />



<Footer />

            </div>
        )
    }
}
