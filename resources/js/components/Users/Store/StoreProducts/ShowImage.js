import React, { useState } from 'react'
import CustomDiaglog from '../../CustomDialog'

export default function ShowImage({imagePath,closeImage, index}) {
const [image, setImage] = useState(imagePath)
    return (
        <CustomDiaglog toggle={closeImage}>

          { typeof imagePath !=='array'? <img src={'/storage'+image.replace('public','')} width='400' height='500' />:
        <img src={'/storage'+imagePath[index].path.replace('public','')} width='400' height='500' />
          }
        </CustomDiaglog>
    )
}
