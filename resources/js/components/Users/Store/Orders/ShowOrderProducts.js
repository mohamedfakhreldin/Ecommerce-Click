import React, { useEffect, useState } from 'react'
import CustomDiaglog from '../../CustomDialog'
import { Link } from 'react-router-dom';
import { apiRequest } from '../../apiRequest/APIFunction';
import Loading from '../../Loading';
export default function ShowOrderProducts({closeOrder, orderData}) {
  const [storeOrderItems, setStoreOrderItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
useEffect(() => {
  const ac= new AbortController;
  apiRequest("profile/order/items/" + orderData.id).then(res =>{setStoreOrderItems(res.data)
    setIsLoading(false)
  } );
  return ()=>ac.abort()
}, [])
return <CustomDiaglog toggle={closeOrder}>
  <blockquote>Order Products</blockquote>
      {isLoading?<Loading />:
      <>
 {storeOrderItems.map(eachItem => {

                                  return (

                                    <h5 key={eachItem.product_id}>
                                      <Link
                                        className={"link"}
                                        to={
                                          "/product/show/" + eachItem.product_id
                                        }
                                      >
                                        <img
                                          src={
                                            "/storage" + eachItem.products.image
                                          }
                                          width="40"
                                          height="40"
                                        />
                                        {eachItem.products.product_name +
                                          " x" +
                                          eachItem.quantity}
                                        <span className="float-right">
                                          {eachItem.price + ' EGP'}
                                        </span>
                                      </Link>
                                    </h5>
                                  );
                                })}
                                <h5>
                                <b>Sub Total:</b>
                                <span className="float-right">
                                          {orderData.total+ ' EGP'}
                                        </span>
                                </h5>
                                <h5>
                                <b>Discount: </b>
                                <span className="float-right">
                                          {orderData.discount+ ' EGP'}
                                        </span>
                                </h5>
                                <h5>
                                <b>Total:</b>
                                <span className="float-right">
                                          {orderData.total-orderData.discount+ ' EGP'}
                                        </span>
                                </h5>
</>
}
</CustomDiaglog>

}
