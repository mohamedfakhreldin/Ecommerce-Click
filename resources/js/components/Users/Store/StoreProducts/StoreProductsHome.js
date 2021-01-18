import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../../apiRequest/APIFunction'
import AddOffer from './Offers/AddOffer';
import { data } from 'jquery';
import StoreProductDelete from './StoreProductDelete';
import Table from '../Table';
import { SessionFlushMessage } from '../../apiRequest/SessionFlush';
import ShowOffer from './Offers/ShowOffer';
import ReasonShow from '../ReasonShow';

export default function StoreProductsHome() {
    const [myProducts, setMyProducts] = useState({})
    const [selectedProduct, setSelectedProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [deleteProductID, setDeleteProductID] = useState(null)
    const [toggleDelete, setToggleDelete] = useState(false)
    useEffect(() => {
        apiRequest('products/all').then(res=>{
            setMyProducts(res.data)
            setIsLoading(false)

        })
    }, [])
    const deleteConfirmation =()=>{
      setDeleteProductID(null)

    }
    const insertOffer=(index,newData)=>{
      let editData =myProducts
      editData[index].offers=newData
      console.log(editData);
      setMyProducts([...editData])
    }
    const addOffer= ()=>{
        setSelectedProduct({})
    }
    const [deletedOffers, setDeletedOffers] = useState([])
    const deleteOffer= (offerID,index)=>{

      let data = myProducts
      data[index].offers=null
    apiRequest('offer/'+offerID,{},null,'delete').then(res=>{
        setMyProducts([
            ...data

        ])
        setSelectedProduct({})
    })
    }

    return (
        isLoading ?'':
        <div>
        <Link to={'/store/dashboard/product/create'}>Create Product</Link>
     <SessionFlushMessage />
<Table columns={['#','Product Title','Price','Trademark','Category','Amount','Status']}>
{myProducts.map((eachProduct,index)=>
        <tr key={eachProduct.id}>
        <th scope="row">{eachProduct.id}</th>
        <td>{eachProduct.product_name}</td>
        <td>{eachProduct.price}</td>
        <td>{eachProduct['trademark'].name}</td>
        <td>{eachProduct.category.category_name}</td>
        <td>{eachProduct.amount}</td>
        <td>{eachProduct.rejection_reason?<button onClick={()=>setSelectedProduct({data:eachProduct.rejection_reason, type:'reasonShow'})} className='btn btn-danger'>Rejected</button>:eachProduct.status===0?'Pending':'Accepted'}</td>
         <td>
             {eachProduct.offers ?

                <button onClick={()=>setSelectedProduct({data:eachProduct.offers,type:'show',index})} className='btn btn-warning'>Show Offer</button>
        :
             <button  onClick={()=>setSelectedProduct({data:{data:eachProduct,index},type:'add'})} className='btn btn-info'>Add Offer</button>

            }
             </td>
             <td>       <Link className ='btn btn-info' to={'/store/dashboard/product/edit/'+eachProduct.id}>Edit Product</Link>
             <button onClick={()=>setDeleteProductID(eachProduct.id)} className='btn btn-danger'>Delete</button>
             </td>
      </tr>
        )}
</Table>
        {selectedProduct.type=='add'?<AddOffer insertOffer={insertOffer} selectedProduct={selectedProduct.data} addOffer={addOffer} />:null}
        {selectedProduct.type=='show'?<ShowOffer selectedProduct={selectedProduct.data}
        deleteOffer={deleteOffer}
        index={selectedProduct.index}
        addOffer={addOffer} />:selectedProduct.type=='reasonShow'?<ReasonShow reason={selectedProduct.data} closeReason={addOffer} />:null}
        {deleteProductID?<StoreProductDelete productID={deleteProductID} deleteConfirmation={deleteConfirmation} />:null}
        </div>
    )
}
