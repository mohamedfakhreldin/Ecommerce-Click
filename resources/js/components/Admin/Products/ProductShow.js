import React, { useEffect, useRef } from 'react'

import { productShow } from '../../Users/style'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import Rating from '@material-ui/lab/Rating'
import { words, remove } from 'lodash'


//import AddReview from './AddReview'
import Axios from 'axios'
import { data } from 'jquery'

export default function ProductShow(props) {

    const mainImgRef = useRef()
    const [toggleReview, setToggleReview] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [productData, setProductData] = useState({})
    const [activeImage, setactiveImage] = useState(0)
    const [showButton, setShowButton] = useState(true)
    const [reviews, setReviews] = useState({})

    useEffect(() => {
        Axios.get('/admin/product/' + props.match.params.id).then(res => {
            setProductData(res.data)
            //     document.title =res.data.products[0].product_name



            setIsLoading(false)

        })
    }, [props.match.params.id])
    const getRating = (page) => {
        page == null ? setShowButton(false) :
            Axios.get('/api/product/reviews/' + props.match.params.id + '/', {
                params: {
                    page: page
                }
            }).then(res => {
                page == 1 ? setReviews(res.data) : setReviews({
                    ...reviews,
                    data: [...reviews.data, ...res.data.data],
                    current_page: res.data.current_page,
                    next_page: res.data.next_page
                })
            })
    }

     const addInsertedReview = ()=>{
      Axios.get('/api/product/reviews/lastinserted/' + props.match.params.id + '/',
    ).then(res => {
         setReviews({
            ...reviews,
            data: [res.data, ...reviews.data],

        })
        console.log(res.data);
    })
     }
    const changeImage = (e) => {
        setactiveImage(e.target.id)
        mainImgRef.current.src = e.target.src
    }
    const DescriptionHeader = "  <center><h4><b>Product Description</h4>        </b></center> "
    const removeReview = (id, index) => {

    }
    return (
        isLoading ? '' :
            <>


                <div className='container' style={productShow.container}>

                    <h3>

                    </h3>
                    <div className={'row'} >

                        <div className='col-lg-3 col-md-6 col-sm-12' style={{ padding: 0 }}>

                            <img style={{ width: '100%' }} ref={mainImgRef} src={productData.image ? '/storage' + productData.image : '/img/SZD-200.png'} height='340' alt="..." />
                        </div>
                        <div className='col-lg-9 col-md-6 col-sm-12'>
                            <b style={{ top: '-15px' }} className='float-right'>
                            </b>
                            <b className='float-right'>

                                Store: {productData.store.store_name}</b>
                            <h3>

                                {productData.product_name}
                            </h3>

                            <br />
                            <b>Trademark:<span style={{ color: 'lightsalmon' }}> {productData.trademark.name}</span> </b><br />
                            <b>Price: </b>    {productData.offers ? <>
                                {((productData.price) - (productData.offers.discount)) + ' EGP'}


                                <br />
                                <small>

                                    <del style={{ left: '75px', position: 'absolute' }}>
                                        <div className='badge badge-light' style={{ float: 'right' }}>
                                            {Math.round((productData.offers.discount / productData.price) * 100)}% Discount
                      </div>
                                        {productData.price}
                    EGP
                    </del>
                                </small>
                            </> : productData.price + ' EGP'}
                            <br />

                            <div className='row' style={{ margin: '30px' }}>
                                <div style={{ margin: '20px auto' }} className='col-lg-3'>
                                    <img style={{ cursor: 'pointer', width: '100%', borderColor: activeImage == 0 ? productData.color.color_code : 'none' }} id={0} onClick={changeImage} className={activeImage == 0 ? 'active-img' : ''} src={productData.image ? '/storage' + productData.image : '/img/SZD-200.png'} height='140' alt="..." />
                                </div>
                                {productData.images ? productData.images.map((eachImage, index) => {
                                    return <div style={{ margin: '20px auto' }} className='col-lg-3'>
                                        <img style={{ cursor: 'pointer', width: '100%', borderColor: activeImage == 1 ? productData.color.color_code : 'none' }} id={index + 1} onClick={changeImage} className={activeImage == index + 1 ? 'active-img' : ''} src={'/storage' + eachImage.path} height='140' alt="..." />
                                    </div>
                                }) : null}


                            </div>
                            <section className='float-right'>


                            </section>
                        </div>
                    </div>
                </div>

                <div style={productShow.container} className='container' dangerouslySetInnerHTML={{ __html: DescriptionHeader + productData.product_description }} />


            </>

    )
}

