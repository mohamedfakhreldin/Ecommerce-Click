import React from 'react'

export default function DropDown(props) {
    return (
        <div>
             <div className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id='navbarDropdown'  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {props.name}
        </a>
                    <div className="dropdown-menu"  >
                        {props.children}

        </div>
                </div>
        </div>
    )
}
