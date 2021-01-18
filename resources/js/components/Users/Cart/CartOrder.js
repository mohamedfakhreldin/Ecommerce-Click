import React, { useState } from 'react'
import Label from '../Store/StoreProducts/Label'
import { apiRequest } from '../apiRequest/APIFunction'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router';
import { catchingErrors } from '../apiRequest/catch';
import { SessionFlushManyErrorsMessages } from '../apiRequest/SessionFlush'
import { clearAllDispatch } from '../ReduxStore/dispatch';
 function CartOrder(props) {

    const [newData, setNewData] = useState({
        address:'',
        method:'cash',
        products:props.productsOrder
    })
    const [errors, setErrors] = useState(false)
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
    }
    const submitForm = (e) => {
        e.preventDefault()
        apiRequest('order/create/save', newData, null, 'post')
        .catch(errors=>setErrors(catchingErrors(errors)))
        .then(res=>{
            sessionStorage.setItem('success',res.data.successMessage)
            dispatch(clearAllDispatch())
            props.history.push('/profile/orders')

        })
    }
    return (
<>
        <div onClick={props.openOrder} className={'overlay'}>
</div>
<dialog open className={'dialog'}>
<form onSubmit={submitForm}>
{errors?<SessionFlushManyErrorsMessages errors={errors} />:null}

                    <div className={'form-group'}>
                        <Label name="Address" />
                        <input className={'form-control'} onChange={handleChange} type='text' name='address' />
                    </div>
                    <div className={'form-group'}>
                        <Label name="Payment Method" />
<br/>
                        <input onChange={handleChange} type='radio' name='method' checked /> Cash
                        <div className='float-right'>

                        <input disabled onChange={handleChange} type='radio' name='method' /> Credit Card<small>(Comming Soon)</small><br/>
                        </div>
                    </div>

                    <button type='submit' className={'btn btn-info'}>Submit</button>
                </form>
</dialog>

  </>
    )
}
export default withRouter(CartOrder);
