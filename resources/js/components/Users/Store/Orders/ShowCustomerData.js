import React from 'react'
import { useEffect } from 'react'
import { apiRequest } from '../../apiRequest/APIFunction'

export default function ShowCustomerData({user, closeUser}) {

    return (
        <>
        <div onClick={closeUser} className={'overlay'}>


        </div>
        <dialog open style={{marginTop:window.scrollY+'px'}} className={'dialog'}>
            <h3><center><b>Customer Infomation</b></center></h3>
            <hr />
            <h5>
                <b>Email: </b> {user.email}
            </h5>
            <h5>
                <b>Name: </b> {user.name}

            </h5>
            <h5>
                <b>Address: </b> {user.address}

            </h5>
</dialog>
        </>
    )
}
