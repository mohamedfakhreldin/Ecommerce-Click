 import React, { useState } from 'react'

import Axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import { apiRequest } from '../apiRequest/APIFunction'
 export default function CreateStore(props) {
const [data, setData] = useState({})
const [errors, setErrors] = useState(false)
    const handleChange = (e)=>{
     setData({
         ...data,
         [e.target.name]:e.target.value
     })
    }


const sendData = (e)=>{


    e.preventDefault()
    apiRequest('store/create',data,null,'post').then(res=>{
        sessionStorage.setItem('success',res.data.successMessage)
        window.location='/profile/'
    }).catch(res=>setErrors(res.response.data.errors)
    )
}




     return (
         <div>
             {!errors ? '' :
                 <>
                 {Object.keys(errors).map(error =>
                     <Alert severity="error">{errors[error]}</Alert>
                     )}
                     </>}
             <form onSubmit={sendData}>
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text" id="basic-addon1"> Store Name </span>
    </div>
    <input required onChange={handleChange} type="text" className="form-control" placeholder="Store Name" aria-label="Username" name="store_name" aria-describedby="basic-addon1" />
  </div>
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text" id="basic-addon1"> Phone Number </span>
    </div>
    <input required onChange={handleChange}type='text' className="form-control" placeholder="Phone Number" aria-label="Username" name="phone_number" aria-describedby="basic-addon1" />
  </div>
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text" id="basic-addon1">Location (google Map url)</span>
    </div>
    <input required onChange={handleChange} type="text" className="form-control" placeholder="Location (google Map url)" aria-label="Username" name="location" aria-describedby="basic-addon1" />
  </div>
  <button type="submit" className="btn btn-dark">Create Store</button>
  <button style={{float:'right'}} type='button' onClick={props.toggleStore} className="btn btn-light">Back</button>
</form>

         </div>
     )
 }
