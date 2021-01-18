import React, { useEffect, useRef } from 'react'
import { apiRequest } from '../apiRequest/APIFunction'
import { productShow } from '../style'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import CartButton from '../Cart/CartButton'
import Rating from '@material-ui/lab/Rating'
import { words, remove } from 'lodash'
import ProductItem, { FavouriteButton } from './ProductItem'
import { addProductsDispatch, clearAllDispatch } from '../ReduxStore/dispatch'
import AddReview from './AddReview'
import Axios from 'axios'
import { data, error } from 'jquery'
import { SessionFlushMessage } from '../apiRequest/SessionFlush'
import Alert from '@material-ui/lab/Alert'
import { catchingErrors } from '../apiRequest/catch'

export default function ProductShow(props) {
    const dispatch = useDispatch()
    const mainImgRef = useRef()
    const [toggleReview, setToggleReview] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [productData, setProductData] = useState({})
    const [activeImage, setactiveImage] = useState(0)
    const [showButton, setShowButton] = useState(true)
    const [reviews, setReviews] = useState({})
const [successMessage, setSuccessMessage] = useState(false)
    const products = useSelector(state => state.products)
    useEffect(() => {
      apiRequest('product/' + props.match.params.id).then(res => {
        setProductData(res.data.product[0])
        getRating(1)
        dispatch(addProductsDispatch(res.data))
        document.title =res.data.product[0].product_name

            setIsLoading(false)

        }).catch(errors=>catchingErrors(errors))
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
    const toggleSuccessMessage = ()=>{
        setSuccessMessage('Review Added Successfully')
        setTimeout(() => {
setSuccessMessage(false)
        }, 4000);
    }
     const addInsertedReview = ()=>{
      Axios.get('/api/product/reviews/lastinserted/' + props.match.params.id + '/',
    ).then(res => {
         setReviews({
            ...reviews,
            data: [res.data, ...reviews.data],

        })

    }).catch(errors=>catchingErrors(errors))
     }
    const changeImage = (e) => {
        setactiveImage(e.target.id)
        mainImgRef.current.src = e.target.src
    }
    const DescriptionHeader = "  <center><h4><b>Product Description</h4>        </b></center> "
    const removeReview = (id, index) => {
        apiRequest('review/delete/' + id, {}, {}, 'DELETE'
        ).then(() => {
            let data = reviews
            data.data.splice(index, 1)
            setReviews({
                ...reviews,
                data: [...data.data]
            })
        })
    }
    return (
        isLoading ? '' :
            <>

                {toggleReview ? <AddReview toggleSuccessMessage={toggleSuccessMessage} addInsertedReview={addInsertedReview} toggleReview={() => setToggleReview(false)} id={productData.id} /> : null}
                <div className='container' style={productShow.container}>


                    <div className={'row'} >
                        <FavouriteButton productReduxName='product' className='fav-show' data={{ id: productData.id }} index={0} />
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
                            <Rating name="half-rating-read" precision={0.5} value={productData.rating_count} readOnly />
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
                                <CartButton productData={productData} />

                            </section>
                        </div>
                    </div>
                </div>

                <div style={productShow.container} className='container' dangerouslySetInnerHTML={{ __html: DescriptionHeader + productData.product_description }} />


                <h3 style={{ margin: '2%' }}><b style={{ 'margin': '7%', color: 'black' }}>Similar Products</b></h3>
                <div className='row justify-content-center'>
                    {products.similar_products.map((product, index) => <div key={index} className='col-lg-2'>
                        <ProductItem index={index} productData={product} productReduxName={'similar_products'} />


                    </div>)}
                </div>
                <div style={productShow.container} className='container'  >

                    <h4><b id="rating"><center>Ratings</center></b></h4>
                    <a className='float-right' href='#rating' onClick={() => setToggleReview(true)}>Add a review</a>
                    <br />
                           {successMessage? <Alert severity='success'>{successMessage}</Alert>:null}
                    {reviews.data ? reviews.data.map((review, index) => {
                        return <div key={index}>

                            <h3><b>{review.name}<span style={{ fontSize: '15px' }} className='float-right'>{review.created_date}</span></b></h3>
                            <Rating name="read-only" value={review.rating} readOnly />
                            {review.user_id == localStorage.getItem('id') ?
                                <i className='fa fa-trash float-right' style={{ cursor: 'pointer' }} onClick={() => removeReview(review.id, index)} /> : null}
                            <p>{review.comment}</p>
                            <hr />
                        </div>
                    }) : null}
                    <center>
                        {productData.rating_count>4 || reviews.current_page<reviews.last_page ? showButton ?
                            <button type='button' className='btn btn-light' onClick={() => getRating(reviews.data ? reviews.next_page : 1)}>Show More</button> : null : null}
                    </center>
                </div>
            </>

    )
}

