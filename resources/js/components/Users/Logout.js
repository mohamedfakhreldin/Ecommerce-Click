import React, { useEffect } from 'react'
import { auth } from './apiRequest/AuthRequest'

export default function Logout(props) {
    useEffect(() => {
        auth.logout()//?props.history.push('/'):null


    }, [])

    return '' ;


}
