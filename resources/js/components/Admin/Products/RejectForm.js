import React, { useState, useEffect } from 'react'
import CustomDiaglog from '../../Users/CustomDialog'
import Axios from 'axios'

export default function RejectForm({reject,productIDAndIndex, closeForm}) {
  const [data, setData] = useState({})
  const sendForm = (e)=>{
    e.preventDefault()
    Axios.post('/admin/product/rejection/'+productIDAndIndex.id, data)
   reject(productIDAndIndex.index, data.rejection_reason)
    closeForm()
  }
  return (
    <CustomDiaglog toggle={closeForm}>

    <form onSubmit={sendForm }>
      <label>Rejection Reason</label>
<textarea  onChange={(e)=>setData({rejection_reason:e.target.value})} className='form-control' />
   <button type='submit' className ='btn btn-light'>Send Rejection</button>
    </form>
    </CustomDiaglog>
  )
}
