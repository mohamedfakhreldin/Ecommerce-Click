import React from 'react'
import CustomDiaglog from '../CustomDialog'

export default function ReasonShow({closeReason , reason}) {
  return (
   <CustomDiaglog toggle={closeReason}>
     <p>{reason}</p>
   </CustomDiaglog>
  )
}
