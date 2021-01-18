import React, { Component, useEffect, useState } from 'react'


import Axios from 'axios';

import { catchingErrors } from '../Users/apiRequest/catch';


export default function Dashboard(props){
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
useEffect(() => {
    Axios.get('/admin/dashboard').then(res=>{
        setData(res.data.products)
        setLoading(false)
    })
}, [])

const confirmProduct =(productID,index)=>{
    Axios.post('/admin/dashboard/status/'+productID).then(res=>{
let newData =  data
newData[index].status=newData.status===1?0:1
setData([...newData])
    }).catch(errors=>catchingErrors(errors))

}

return loading?'': <div className="content-wrapper" style={{  backgroundColor:'white'}}>
   <div className='col-lg-4' style={{ marginTop:"25px", backgroundColor:'white',border:'1px solid #777',borderRadius:'15px'}}>
       <center><b>10 Products</b></center>
        <table class="table table-hover">
                  <thead>
                    <tr>
                 <th>#</th>
                 <th>Product Title</th>
                 <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>{data.map((product,index)=>{
          return            <tr key={index}>
                          <td>{product.id}</td>
                          <td>{product.product_name}</td>
                          <td>{product.status==1 ?'Actived':<button onClick={()=>confirmProduct(product.id,index)} className={'btn btn-success'}>Active</button>}</td>
                      </tr>
 })}
                  </tbody>

            </table>
        </div>

    </div>
};
