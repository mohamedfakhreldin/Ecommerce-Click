import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router';
import Axios from 'axios';
import { Link } from 'react-router-dom';

 function NavbarMenu({children, history, location}) {
const [suggestedData, setSuggestedData] = useState([])
    const [query, setQuery] = useState('')
useEffect(() => {
setQuery(new URLSearchParams( window.location.search).get('q')&& (location.pathname==='/search' || location.pathname==='/search/')  ?new URLSearchParams( window.location.search).get('q'):'')
}, [new URLSearchParams( window.location.search).get('q')])
    const  handleSubmitSearchList = (e)=>{
    Axios.get('/api/searchlist/?q='+query).then(res=>setSuggestedData(res.data))
  }
    return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">

        {children}


        </ul>
        <form   onSubmit={(e)=>{e.preventDefault()  ;setSuggestedData([]); history.push('/search/?q='+query)}} className="form-inline my-2 my-lg-0 search-form">

<div >

            <input name='search' onBlur={()=>setTimeout(() => {
setSuggestedData([])
            }, 200)}  value={query} onKeyUp={handleSubmitSearchList} onChange={(e)=> setQuery(e.target.value)} className="form-control mr-sm-2 search-input" type="search" placeholder="Search" aria-label="Search" />
        {  suggestedData.length>0 ?  <ul onBlur={()=>setSuggestedData([])}  className='search-list mr-sm-2'>
            {suggestedData.map(data=><li key={data.id}><Link onClick={()=>setSuggestedData([])}  to={'/search/?q='+data.product_name} >{data.product_name}</Link></li>)}

            </ul>:null}
</div>
            <button  className="btn btn-outline-success my-2 my-sm-0 my-button" type="submit">Search</button>
        </form></div>
    )
}
export default withRouter(NavbarMenu);
