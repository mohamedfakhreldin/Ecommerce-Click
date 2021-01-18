import React, { useState } from 'react'
import Label from '../Label'
import { apiRequest } from '../../../apiRequest/APIFunction'
import { withRouter } from 'react-router'
import { SessionFlushManyErrorsMessages } from '../../../apiRequest/SessionFlush'
import CustomDiaglog from '../../../CustomDialog'
import { catchingErrors } from '../../../apiRequest/catch'


function AddOffer(props) {
    const [newData, setNewData] = useState({
        product_id: props.selectedProduct.data.id
    })
    const [errors, setErrors] = useState(false)
    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
    }
    const submitForm = (e) => {
        e.preventDefault()
        apiRequest('offer/create/', newData, null, 'post')
        .catch(errors=>setErrors(catchingErrors(errors)))
        .then(res => {
          props.insertOffer(props.selectedProduct.index,res.data[0])
            sessionStorage.setItem('success',res.data.successMessage)
           props.addOffer()


        })
    }
    return (
        <>
          <CustomDiaglog toggle={props.addOffer}>


                <b>{props.selectedProduct.data.product_name} </b><br/>
                <b>Price :{props.selectedProduct.data.price} EGP</b>
                <hr />
                <form onSubmit={submitForm}>
{errors?<SessionFlushManyErrorsMessages errors={errors} />:null}
                    <div className={'form-group'}>
                        <Label name="Discount" />
                        <input step='0.00' className={'form-control'} onChange={handleChange} type='number' name='discount' />
                    </div>
                    <div className={'form-group'}>
                        <Label name="Offer Amount" />
                        <input min={1} max={props.selectedProduct.data.amount} className={'form-control'} onChange={handleChange} type='number' name='amount' />
                    </div>
                    <div className={'form-group'}>
                        <Label name="End Date" />
                        <input className={'form-control'} onChange={handleChange} type='date' name='end_at' />
                    </div>
                    <button type='submit' className={'btn btn-info'}>Submit</button>
                </form>
          </CustomDiaglog>

        </>
    )
}
export default withRouter(AddOffer);
