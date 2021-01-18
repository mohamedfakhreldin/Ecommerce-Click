import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartDispatch, removeFromCartDispatch } from '../ReduxStore/dispatch'

export default function CartButton(props) {
    const dispatch = useDispatch()

    const cartProducts = useSelector(state => state.cartProducts)
    let productData=props.productData
    let miniProductData ={
        amount:productData.amount,
        offers:productData.offers,id:productData.id,
        price:productData.price,
        product_name:productData.product_name
    }
    return (
        <>
            {cartProducts?
            cartProducts.some(cartProducts => cartProducts.id === props.productData.id) ?

                    <button onClick={() => dispatch(removeFromCartDispatch(productData))} className="btn btn-primary cart-button"><i className={'fas fa-trash'}> </i> Remove</button>
                    :
                    <button onClick={() => dispatch(addToCartDispatch(miniProductData))} className="btn btn-primary cart-button"><i className={'fas fa-shopping-cart'}> </i> Add to Cart</button>
:   <button onClick={() => dispatch(addToCartDispatch(miniProductData))} className="btn btn-primary cart-button"><i className={'fas fa-shopping-cart'}> </i> Add to Cart</button>
                }

        </>
    )
}
