import React from 'react'
import { Link, withRouter } from 'react-router-dom'

 function NavLink(props) {
    let path = props.location.pathname + props.location.search
    let activeLink = props.to === path && props.activeClass ? 'nav-link '+props.activeClass:'nav-link'
    return (
<>
 

       <li className="nav-item"><Link to={props.to} className={activeLink} >{!props.icon?'':<img width='20px' height='20px' src={props.icon} />}{props.children}</Link> </li>

         </>)
}
export default withRouter(NavLink)
