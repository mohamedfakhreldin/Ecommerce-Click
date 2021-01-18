import React, { useEffect, useState } from 'react'
import { apiRequest } from '../apiRequest/APIFunction'
import { catchingErrors } from '../apiRequest/catch'
import { SessionFlushManyErrorsMessages } from '../apiRequest/SessionFlush'
import Label from '../Store/StoreProducts/Label'
import Rating from '@material-ui/lab/Rating'
import CustomDiaglog from '../CustomDialog'
import Loading from '../Loading'

export default function AddReview({toggleReview, id, addInsertedReview, toggleSuccessMessage}) {
const [errors, setErrors] = useState(false)

    const [isLoading, setIsLoading] = useState(true)
    const [newData, setNewData] = useState({
        product_id:id,
        rating:1
    })
    useEffect(() => {

     apiRequest('check/product/'+id).then(()=>setIsLoading(false)).catch(errors=>setErrors(catchingErrors(errors)))
    }, [])
    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
    }
    const submitForm = (e) => {
        e.preventDefault()
        apiRequest('review/create/', newData, null, 'post').then(res => {
toggleSuccessMessage()
            addInsertedReview()
           toggleReview()

        }).catch(errors=>setErrors(catchingErrors(errors)))
    }
    return (
        <CustomDiaglog toggle={toggleReview}>
        {isLoading?errors?<SessionFlushManyErrorsMessages errors={errors}/>:<Loading />:
                   <form onSubmit={submitForm}>
{errors?<SessionFlushManyErrorsMessages errors={errors} />:null}
                    <div className={'form-group'}>
                        <Label name="Rating" />
                        <Rating
          name="simple-controlled"
          value={newData.rating}
          onChange={(event, newValue) => {
            setNewData({
                ...newData,
                rating:newValue
            });
          }}
        />
                    </div>
                    <div className={'form-group'}>
                        <Label name="Comment" />
                        <textarea placeholder='Enter Your Comment...' className={'form-control'} onChange={handleChange} type='number' name='comment' />
                    </div>

                    <button type='submit' className={'btn btn-info'}>Submit</button>
                </form>
}
        </CustomDiaglog>
    )
}
