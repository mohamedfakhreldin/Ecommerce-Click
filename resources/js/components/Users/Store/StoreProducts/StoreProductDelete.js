import React, { useState } from 'react'
import Label from './Label'
import { apiRequest } from '../../apiRequest/APIFunction'

export default function StoreProductDelete(props) {

    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
    }
    const submitForm = () => {

        apiRequest('product/delete/'+props.productID, {},null, 'delete').then(res => {
            window.location.reload()

        })
    }
    return (
        <>
            <div  onClick={props.deleteConfirmation} className={'overlay'}>

            </div>
            <dialog open className={'dialog'}>
        Are you Sure you want delete this product ?
<br/>
      <section className='float-right'>
      <button type='button' onClick={submitForm} className='btn btn-danger'>Yes Delete</button>
       <button type='button' onClick={props.deleteConfirmation} className='btn btn-light'>Cancel</button>
      </section>
            </dialog>
        </>
    )
}
