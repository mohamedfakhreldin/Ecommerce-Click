import React from 'react'
import { Link } from 'react-router-dom'

export default function Brand(props) {
    return (
        <>
         <Link className="navbar-brand" to={props.to?props.to:'#'}>{props.children}</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
        </button>
        </>
    )
}
