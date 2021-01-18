import React, { useEffect, useState } from 'react'
import { apiRequest } from '../../apiRequest/APIFunction'
import { Label, SelectLoop, Categories, ImagesInputComponent } from './CreateEditCommonFunctions'
import { catchingErrors } from '../../apiRequest/catch'
import { SessionFlushManyErrorsMessages } from '../../apiRequest/SessionFlush'
import ShowImage from './ShowImage'


export default function StoreProductEdit(props) {
    const [data, setData] = useState({})
    const [newData, setNewData] = useState({})
    const [errors, setErrors] = useState(false)
    const [toggleSelect, setToggleSelect] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [selectFile, setSelectFile] = useState({})
    const [multiSelectFile, setMultiSelectFile] = useState({})
    const [selectedCategory, setSelectedCategory] = useState('Choose')
    const [activeImage, setActiveImage] = useState(false)

    useEffect(() => {
        apiRequest('product/edit/' + props.match.params.id).then(res => {
            let images = res.data.product.images
            let imagesData = {}
          setSelectedCategory(res.data.product.category.category_name)
              images ? images.map(image => imagesData[image.img_name] = { img_name: image.img_name, path: image.path }) : null
            setNewData({...res.data.product,images: imagesData })
            setData({ ...res.data, images: imagesData })
            setIsLoading(false)
        }
        )

    }, [])


    const handleMutliSelectFile = (e) => {

        setMultiSelectFile({
            ...multiSelectFile,

            [e.target.name]: { file: e.target.files[0], progess: 0 }



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
    const handleMultiFile = (fileName, single = false, arrayName) => {
        let file = multiSelectFile[fileName].file;
        const formData = new FormData()
        let name = 'images'
        formData.append(name, file);
        axios.post('/store/product/images', formData, {
            onUploadProgress: processEvent => {
                setMultiSelectFile({
                    ...multiSelectFile,
                    [fileName]: {
                        ...multiSelectFile[fileName],
                        progess: Math.round((processEvent.loaded / processEvent.total) * 100)
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
                let newFile = single ? { img_name: fileName, path: res.data } : { ...newData[arrayName], [fileName]: { img_name: fileName, path: res.data } }
                setNewData({
                    ...newData,
                    [arrayName]: newFile
                })

            })

    }
    const oldCategory=(category)=>{setSelectedCategory(category)
      console.log('pass');}
    const activingImage = image => { setActiveImage(image) }
    const submitForm = (e) => {
        e.preventDefault()
        apiRequest('product/edit/save/' + props.match.params.id, newData, null, 'put').then(res => {

            sessionStorage.setItem('success', res.data.successMessage)
            props.history.push('/store/dashboard/products')

        }).catch(errors => setErrors(catchingErrors(errors)))
    }
    let ImagesComponentArray = []
    for (let i = 0; i < 8; i++) {
        ImagesComponentArray.push(
            <ImagesInputComponent arrayName='images' image={storeImages} name={'images' + (i)} />
        )
    }
    let storeImages = newData.images ? newData.images : false
    return (
        isLoading ? '' :
            <div>
                <fieldset>
                    <legend>  Edit Product</legend>
                    {activeImage ? <ShowImage closeImage={() => setActiveImage(false)} imagePath={activeImage} /> : null}
                    <SessionFlushManyErrorsMessages errors={errors} />
                    <form onSubmit={submitForm}>
                        <Label name="Product Title" />
                        <div className='col-lg-9'> <input value={newData.product_name} className={'form-control'} onChange={handleChange} name='product_name' /></div>

                        <Label name="Price" />
                        <div className='col-lg-9'> <input value={newData.price} className={'form-control'} onChange={handleChange} type='number' name='price' /></div>

                        <Label name="Amount" />
                        <div className='col-lg-9'> <input value={newData.amount} className={'form-control'} onChange={handleChange} type='number' name='amount' /></div>

                        <Label name="Product Description" />
                (use [] to bold text)
                <textarea onChange={handleChange} name='product_description' className='form-control' value={newData.product_description}></textarea>
                        <Label name="Trademark" />
                        <SelectLoop value={newData.trademark_id} handleChange={handleChange} selectName='trademark_id' optionName='name' options={data.trademarks} />
                        <Label name="Color" />

                        <SelectLoop value={newData.color_id} handleChange={handleChange} selectName='color_id' optionName='color_name' options={data.colors} />
                        <Label name="Category" />

                        <div style={{ position: 'relative' }}>

                            <input readOnly value={selectedCategory} onClick={() => { toggleSelect ? setToggleSelect(false) : setToggleSelect(true) }} className='form-control' />

                            <div style={{ display: toggleSelect ? 'block' : 'none' }} className={'tree-select-div'}>
                                <Categories handleChange={handleChangeCategory} list={data.categories} />
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
                            image={newData.images}
                            name={'images' + (0)} />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            arrayName='images'
                            image={newData.images}
                            name={'images' + (1)} />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            arrayName='images'
                            image={newData.images}
                            name={'images' + (2)} />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            arrayName='images'
                            image={newData.images}
                            name={'images' + (3)} />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            arrayName='images'
                            image={newData.images}
                            name={'images' + (4)} />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            arrayName='images'
                            image={newData.images}
                            name={'images' + (5)} />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            arrayName='images'
                            image={newData.images}
                            name={'images' + (6)} />
                        <ImagesInputComponent
                            upload={handleMultiFile}
                            activingImage={image => setActiveImage(image)}
                            handleChange={handleChange}
                            handleMutliSelectFile={handleMutliSelectFile}
                            multiSelectFile={multiSelectFile}
                            arrayName='images'
                            image={newData.images}
                            name={'images' + (7)} />
                        <center>

                            <button type='submit' className='btn btn-light'>Edit Product</button>
                        </center>
                    </form>
                </fieldset>


            </div>
    )
}
