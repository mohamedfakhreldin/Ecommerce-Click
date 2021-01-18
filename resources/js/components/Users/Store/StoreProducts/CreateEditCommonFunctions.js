
import React, { useState } from 'react'
import { Box, CircularProgress, Typography } from '@material-ui/core'
const Label = (props) => {
    return <div className='col-lg-3'> <label> <b>{props.name} : </b></label></div>
}
const SelectLoop = (props) => {

    return (<select
   onChange={props.handleChange} value={props.value?props.value:undefined} name={props.selectName} className={'form-control'}>
        <option>    Choose</option>
        {props.options.map(data => {

            return <option    key={data.id}    value={data.id}>{data[props.optionName]}</option>
        })
        }
    </select>)
}


function Categories(props) {
const [oldCategory, setOldCategory] = useState(false)
oldCategory?props.oldCategory(oldCategory):null
   return props.list.map(category => {

        if (category.children) {

            return (<div key={category.id}  >
                <b style={{padding:props.marginParent?'20px ' +props.marginParent+'px': '0'}}>{category.category_name}</b>
                <Categories  marginParent={props.marginParent?props.marginParent+20: 20}  handleChange={props.handleChange} list={category.children} />
            </div>)
        } else {

          {props.categoryID?props.categoryID===category.id?setOldCategory(category.category_name):null:null}
            return <option   key={category.id} onClick={props.handleChange} style={{ padding: props.marginParent?'20px '+(props.marginParent+20)+'px': '20px'
        ,'cursor':'pointer'
        }} name='category_id' value={category.id}>{category.category_name}</option>
        }

    })

}

export function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="static" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div" color="textSecondary">{ props.value}</Typography>
        </Box>
      </Box>
    );}
 export   const ImagesInputComponent = (props)=>{
        let name=props.arrayName?props.arrayName:props.name

        let images = props.image?props.single?props.image:props.image[props.name]?props.image[props.name].path:false:false
        return    <div key={props.count?props.count:0} className="input-group">
        <div className="custom-file">
            <input name={props.name}  onChange={props.handleMutliSelectFile} type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" />
            <label className="custom-file-label" htmlFor="inputGroupFile04">{props.multiSelectFile?props.multiSelectFile[props.name]?props.multiSelectFile[props.name].progess==='100%'?'Uploaded Successully':'Image Chosen':'Choose Image':'Choose Image'}</label>
        </div>
        <div className="input-group-append">
            <button onClick={()=>props.upload(props.name,props.single,name)} className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Upload</button>
        </div>
        {images?<button type='button' onClick={()=>props.activingImage(images.path?images.path:images)}  className='btn btn-warning'>Show</button>:null}
        <CircularProgressWithLabel value={props.multiSelectFile?props.multiSelectFile[props.name]?props.multiSelectFile[props.name].progess:null:null} />
    </div>
    }
export {
    Categories,
    Label,
    SelectLoop
};
