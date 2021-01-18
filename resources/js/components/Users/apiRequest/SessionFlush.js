import Alert from '@material-ui/lab/Alert'
import React  from 'react'
import { isArray } from 'lodash'
 const SessionFlushCheck = (messageName)=>{
if(sessionStorage.key(messageName)){
    let myMessage =sessionStorage.getItem(messageName)
    sessionStorage.removeItem(messageName)
    return myMessage
}
return false
}
export const SessionFlushMessage= ({messageName='success'})=>{

    let SessionMessage= SessionFlushCheck(messageName)
return  !SessionMessage?null:<Alert severity="success">{SessionMessage}</Alert>
}
;
export const SessionFlushErrorMessage=({messageName='error'})=>{

    return  <Alert severity="error">{messageName}</Alert>
};
export const SessionFlushManyErrorsMessages=({errors, messageName})=>{

return   errors? Object.keys(errors).map(error =>{

 return   <>
    {Array.isArray(error)?  errors[error].map(subError=><Alert severity="error">{subError}</Alert>):<Alert severity="error">{errors[error]}</Alert>}

  </>
}
    ):null
}

