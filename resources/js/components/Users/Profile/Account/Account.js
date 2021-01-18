import React, { useState } from 'react'
import { apiRequest } from '../../apiRequest/APIFunction'
import { Animated } from 'react-animated-css'
import { Link } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { identity } from 'lodash'
import { SessionFlushMessage } from '../../apiRequest/SessionFlush'


let style={
    animated :{
        marginTop:'15px',
    },
    changeButton:{
        backgroundColor :'#283618',
        color:'white'
    },
    editIcon:{
        float:'right',
        color:'#283618',
        cursor:'pointer'
    }
}
export default function Account() {
    const [selectedInput, setSelectedInput] = useState('')
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState('')
    const sendData = (e)=>{

        e.preventDefault()
      apiRequest('profile/edit/'+localStorage.getItem('id'),data,null,'put').catch(error => {
        setErrors(error.response.data.errors)
       })
       .then(res=>{


            localStorage.removeItem(selectedInput)
            localStorage.setItem(selectedInput,data[selectedInput])
            setSelectedInput('')
            setErrors({})

        setSuccessMessage(res.data.successMessage)
        setTimeout(() => {
setSuccessMessage('')
        }, 4000);
        })
    }
    const  handleChangePassword = ()=>{

    }
    const handleChange = (e)=>{

        setData({
            ...data,
            [e.target.name]:e.target.value
        })

    }
     const Form = (input)=>{
        return <form onSubmit={sendData}>
            {input === 'password'?
            <>
              <input onChange={handleChange} type={input} name={'current_password'}
              placeholder={'Current Password'} className={'form-control col-lg-10'} />
            <input onChange={handleChange} type={input} name={input} placeholder={'New Password'} className={'form-control col-lg-10'} />
             <input onChange={handleChange} type={input} name={'password_confirmation'} placeholder={'Confirm New Password'} className={'form-control col-lg-10'} />
            </>
                :

                <input onChange={handleChange} type={input} name={input} className={'form-control col-lg-10'} />
            }
             <button type="submit"style={style.changeButton} className='btn btn-light col-lg-2'>
                 Change
             </button>
         </form>

     }
    const toggleEdit =(inputType,same=selectedInput)=>{
        setData({})
         if(same===inputType){
            setSelectedInput('')
            setErrors({})
         } else{
             setSelectedInput(inputType)
             setErrors({})
            }
    }

    return (
        <>

<center><strong>
<SessionFlushMessage messageName="success" />

Personal Infomation
</strong></center>
{!errors ? '' :
                 <>
                 {successMessage?<Alert severity="success">{successMessage}</Alert>:null}
                 {Object.keys(errors).map(error =>
                     <Alert severity="error">{errors[error]}</Alert>
                     )}
                     </>}
        <Animated O animationIn="fadeIn" style={style.animated} animationOut="fadeOut" animateInDuration={3000} >
        <h5>
         <div className={'col-lg-2'}>
              <strong>Name : </strong>
              </div>
                <div className={'col-lg-9'}>{selectedInput=='name'?Form(selectedInput):localStorage.getItem('name')} <i onClick={()=>toggleEdit('name')} style={style.editIcon} className="fas fa-edit"></i></div>

        </h5>
    </Animated>
         <Animated animationIn="fadeIn" style={style.animated} animationOut="fadeOut" animateInDuration={3500} >
         <h5>
        <div className={'col-lg-2'}>
             <strong> Email : </strong>
             </div>
             <div className={'col-lg-9'}>{selectedInput=='email'?Form(selectedInput):localStorage.getItem('email')}  <i onClick={()=>toggleEdit('email')} style={style.editIcon} className="fas fa-edit"></i></div>
       <br />
         </h5>
     </Animated>
     <Animated animationIn="fadeIn" style={style.animated} animationOut="fadeOut" animateInDuration={4000} >
         <h5>
       <div className={'col-lg-2'}>
            <strong> Password : </strong>
            </div>
            <div className={'col-lg-9'}>  {selectedInput=='password'?Form(selectedInput):'******'} <i onClick={()=>toggleEdit('password')} style={style.editIcon} className="fas fa-edit"></i></div>
       <br />
         </h5>
     </Animated>
     </>
    )
}
