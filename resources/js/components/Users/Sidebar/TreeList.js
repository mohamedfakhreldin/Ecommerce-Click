import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function TreeLists(props) {
    const [ToggleTree, setToggleTree] = useState(false)
    const Tree=()=>{
        ToggleTree?setToggleTree(false):setToggleTree(true)
    }
    let path = location.pathname+location.search
    let activeLink = props.to === path && props.activeClass ? 'nav-link '+props.activeClass:'nav-link'
    return (
        <>
      <li className={'nav-item'}>  <Link className={activeLink}  to={props.to?props.to:'#'}><img width='20px' height='20px' src={props.icon} /> {" "+props.name+' '
      }
      </Link>
      <i style={{cursor:'pointer',float:'right'}} onClick={Tree} className={ToggleTree?"fas fa-chevron-up":"fas fa-chevron-down"}></i>
      </li>
        <ul className="tree-list" style={{display:ToggleTree?'block':'none'}}>
       {props.children}
                    </ul>

        </>
    )
}
