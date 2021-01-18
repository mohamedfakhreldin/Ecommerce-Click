import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'


import Admin from './Admin/Admin';
import User from './Users/User';
import StoreDashboard from './Users/Store/StoreDashboard';
import Login from './Admin/Login';
class Example extends Component {

    render() {
        return (

            <>
                <Router >

                    {/* Main Component  */}

                    <Switch>
                    <Route path='/admin/login'  component={Login} />
                    <Route path='/store/dashboard/'  component={StoreDashboard}/>
                        <Route path='/admin/'  component={Admin} />
                        <Route path='/' component={User} />

                    </Switch>

                </Router>
            </>

        )
    }
}
export default withRouter(Example)
ReactDOM.render(<Example />, document.getElementById('app'))
