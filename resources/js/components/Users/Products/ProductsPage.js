import React, { useState, useEffect } from 'react'
import Rating from '@material-ui/lab/Rating'
import { Link } from 'react-router-dom'
import { productShow } from '../style'
import CartButton from '../Cart/CartButton'
import { apiRequest } from '../apiRequest/APIFunction'
import { catchingErrors } from '../apiRequest/catch'

import { useSelector, useDispatch } from 'react-redux'
import Pagination from '@material-ui/lab/Pagination'
import { addProductsDispatch } from '../ReduxStore/dispatch'
import ProductItem from './ProductItem'

export default function ProductsPage() {
  const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const [dataState, setDataState] = useState([])
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page')?new URLSearchParams(window.location.search).get('page'):1)
useEffect(() => {
setDataState(products)
}, [products])



return (  <div className='row'>
 
                {dataState.data?dataState.data.map((data,index) => {

         return      <div key={index} style={{marginTop:'20px'}} className={'col-lg-3'}>
                   <ProductItem productReduxName='data' productData={data} index={index} />
             </div>
                }):null}
                </div>



    )
}
