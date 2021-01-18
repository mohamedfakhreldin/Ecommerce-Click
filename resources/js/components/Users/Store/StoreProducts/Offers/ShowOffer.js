import React from 'react'
import Label from '../Label'
import { withRouter } from 'react-router'
import CustomDiaglog from '../../../CustomDialog'


function ShowOffer(props) {

    return (
        <>
          <CustomDiaglog toggle={props.addOffer}>





                    <div className={'form-group'}>
                        <Label name="Discount" />
                 {props.selectedProduct.discount}
                    </div>
                    <div className={'form-group'}>
                        <Label name="Offer Amount" />
                        {props.selectedProduct.amount}
                    </div>
                    <div className={'form-group'}>
                        <Label name="End Date" />
                        {props.selectedProduct.end_at}
                    </div>
                    <button onClick={()=>props.deleteOffer(props.selectedProduct.id,props.index)} className='btn btn-danger'>Delete Offer</button>
          </CustomDiaglog>

        </>
    )
}
export default withRouter(ShowOffer);
