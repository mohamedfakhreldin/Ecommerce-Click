import React, { useEffect, useState } from 'react'
import { apiRequest } from '../../apiRequest/APIFunction'
import { method } from 'lodash'
import { Categories, SelectLoop, Label, CircularProgressWithLabel, ImagesInputComponent } from './CreateEditCommonFunctions'
import { SessionFlushManyErrorsMessages } from '../../apiRequest/SessionFlush'
import { catchingErrors } from '../../apiRequest/catch'
import ShowImage from './ShowImage'


export default function StoreProductCreate(props) {
    const [data, setData] = useState({})
    const [toggleSelect, setToggleSelect] = useState(false)
    const [newData, setNewData] = useState({})
    const [errors, setErrors] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [multiSelectFile, setMultiSelectFile] = useState({})
    const [selectedCategory, setSelectedCategory] = useState('Choose')

    const [activeImage, setActiveImage] = useState(false)
    useEffect(() => {
        apiRequest('product/create').then(res => {
            setData(res.data)
            setIsLoading(false)
        }
        )

    }, [])

    const handleMutliSelectFile = (e) => {

        setMultiSelectFile({
            ...multiSelectFile,

            [e.target.name]:{ file: e.target.files[0],progess:0}

        })
    }

    const handleMultiFile = (fileName,single=false,arrayName) => {
        let file = multiSelectFile[fileName].file;
        const formData = new FormData()
        let name = 'images'
        formData.append(name, file);
        axios.post('/store/product/images', formData, {
            onUploadProgress: processEvent => {
                setMultiSelectFile({
                    ...     multiSelectFile,
                    [fileName]:{
                        ...multiSelectFile[fileName],
                        progess: Math.round((processEvent.loaded / processEvent.total) * 100) + '%'
                    }

                })
            }
            ,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        )
        .then(res => {
            let newFile =single?{img_name:fileName, path:res.data}:{...newData[arrayName],[fileName]:{img_name:fileName, path:res.data}}
            setNewData({
                ...newData,
                [arrayName]:newFile
            })


            })

        }
    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
    }
    const handleChangeCategory = (e) => {
        let index = e.nativeEvent.target.text;
        let label = e.nativeEvent.target.value;
        setSelectedCategory(index)
        setNewData({
            ...newData,
            category_id: label
        })
        setToggleSelect(false)
    }
    const submitForm = (e) => {
        e.preventDefault()
        apiRequest('product/create/save', newData, null, 'post').then(res => {

            sessionStorage.setItem('success',res.data.successMessage)
            props.history.push('/store/dashboard/products')
        }).catch(errors=>setErrors(catchingErrors(errors)))
    }
    let storeImages = newData.images?newData.images:false
    return (
        isLoading ? '' :
            <div onClick={()=>toggleSelect?setToggleSelect(false):null}>
                <fieldset>
                    <legend>  Create Product</legend>
                    {activeImage?<ShowImage closeImage={()=>setActiveImage(false)} imagePath={activeImage} />:null }
                  { errors? <SessionFlushManyErrorsMessages errors={errors}/>:null}
                    <form onSubmit={submitForm}>
                        <Label name="Product Title" />
                        <div className='col-lg-9'> <input className={'form-control'} onChange={handleChange} name='product_name' /></div>

                        <Label name="Price" />
                        <div className='col-lg-9'> <input step='0.00' className={'form-control'} onChange={handleChange} type='number' name='price' /></div>

                        <Label name="Amount" />
                        <div className='col-lg-9'> <input  className={'form-control'} onChange={handleChange} type='number' name='amount' /></div>

                        <Label name="Product Description" />
                (use [] to bold text)
                <textarea onChange={handleChange} name='product_description' className='form-control'></textarea>
                        <Label name="Trademark" />

                        <SelectLoop handleChange={handleChange} selectName='trademark_id' optionName='name' options={data.trademarks} />

                        <Label name="Color" />
                        <SelectLoop handleChange={handleChange} selectName='color_id' optionName='color_name' options={data.colors} />

                        <Label name="Category" />
                        <div style={{position:'relative'}}>

                        <input readOnly  value={selectedCategory} onClick={()=>{toggleSelect?setToggleSelect(false):setToggleSelect(true)}} className='form-control'/>

                        <div style={{display:toggleSelect?'block':'none'}}  className={'tree-select-div'}>
                            <Categories  handleChange={handleChangeCategory} list={data.categories} />
                        </div>
                            </div>

                           <Label name="Product Image" />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            single image={newData.image}
                            name={'image'} />

                        <Label name="Product Addition Images" />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            arrayName='images'
                            image={storeImages}
                            name={'images' + (0)} />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            arrayName='images'
                            image={storeImages}
                            name={'images' + (1)} />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            arrayName='images'
                            image={storeImages}
                            name={'images' + (2)} />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            arrayName='images'
                            image={storeImages}
                            name={'images' + (3)} />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            arrayName='images'
                            image={storeImages}
                            name={'images' + (4)} />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            arrayName='images'
                            image={storeImages}
                            name={'images' + (5)} />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            arrayName='images'
                            image={storeImages}
                            name={'images' + (6)} />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            arrayName='images'
                            image={storeImages}
                            name={'images' + (7)} />
                            {/* <Label name="Secondary Images"  />
                            <span className='float-right'>

                            <button type='button' className='btn btn-light ' onClick={AddImagesInput}>+</button>
                            <button type='button' className='btn btn-light ' onClick={removeImagesInput}>-</button>
                            </span> */}

          <center>
                            <button type='submit' className='btn btn-light'>Create Product</button>
                        </center>
                    </form>
                </fieldset>


            </div>
    )
}
