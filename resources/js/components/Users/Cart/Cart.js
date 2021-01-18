import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cart, colors } from '../style';
import CartOrder from './CartOrder';
import { changeQuantityDispatch, removeFromCartDispatch, clearAllDispatch } from '../ReduxStore/dispatch';

export default function Cart() {
    const [toggleOrder, setToggleOrder] = useState(false)
    const openOrder =()=>{
        toggleOrder===true ? setToggleOrder(false) : setToggleOrder(true)
        }

    const dispatch = useDispatch()
    document.title = 'Cart'
   const cartProducts = useSelector(state => state.cartProducts)
    var totalPrice = 0;

    return (
        <div className='container-fluid' style={cart.cartContainer}>
            <center style={cart.cartHeader}>
                <h1>
                    <i className={'fas fa-shopping-cart'}> </i>
                    <b>Cart</b>
                </h1>
            </center>{

            }
            {cartProducts?cartProducts.length>0?
                <>
                    <table className="table table-hover table-responsive-md">
                        <thead >
                            <tr>

                                <th>Product Title</th>
                                <th>Product Price</th>
                                <th>Total Price </th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody >

                            {cartProducts.map((product) => {
                                let saving=product.offers?product.quantity>product.offers.amount ?
                                (product.offers.discount*product.offers.amount)  :
                                 product.offers.discount * product.quantity :0

                            let priceAfterDiscount = product.offers ?
                            product.quantity>product.offers.amount ?
                            (product.price*product.quantity)-(product.offers.discount*product.offers.amount)  :
                            (product.price - product.offers.discount) * product.quantity :
                             product.price * product.quantity



                            totalPrice = (Number(totalPrice)+ Number(priceAfterDiscount))
                            return <tr key={product.id}>

                                <td>  {product.product_name}</td>
                                <td>{product.price + ' EGP'}

                                </td>
                                <td>{priceAfterDiscount + ' EGP'}
                            <span className='badge badge-success' style={{marginLeft:'10%',}}>Savings: {saving+' EGP'}</span>
                                </td>
                                <td><input min='1' max={product.amount} onChange={(e) => dispatch(changeQuantityDispatch(e.target.value, product ))} type='number' value={product.quantity} /></td>
                                <td><div className='btn btn-danger' onClick={(e) => dispatch(removeFromCartDispatch(product))} ><i className='fas fa-trash'></i> Remove</div></td>
                            </tr>
                        })}
                            <tr>
                                <td><b>Total : </b></td>
                                <td></td>
                                <td></td>

                                <td style={{ color: colors.secondaryColor, fontWeight: 'bold' }}>{totalPrice + ' EGP'}</td>
                            </tr>
                        </tbody>

                    </table>
                    <span className="btn my-button"  onClick={openOrder} style={cart.cartCheckout}>Checkout</span>
                {  toggleOrder?  <CartOrder productsOrder={cartProducts} openOrder={openOrder} />:null}
                <button type={'button'} className={'btn btn-danger'} onClick={()=>dispatch(clearAllDispatch())}>Remove All</button>
                </> :
                <center><h1 style={{ color: '#999', 'margin': '18%' }}><b>No Item</b></h1></center>:

                <center><h1 style={{ color: '#999', 'margin': '18%' }}><b>No Item</b></h1></center>
            }
        </div>
    )
}
