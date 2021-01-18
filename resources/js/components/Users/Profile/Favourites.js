import React, { useEffect, useState } from 'react'
import { apiRequest } from '../apiRequest/APIFunction';
import NavLink from '../Navbar/NavLink';
import CartButton from '../Cart/CartButton';
import { Link } from 'react-router-dom';

export default function Favourites() {
    const [favourites, setFavourites] = useState([])
    useEffect(() => {
        apiRequest('profile/favourites').then(res => {

            setFavourites(res.data)
        })

    }, [])
    return (
        <div>
            <center><strong>

                Favourites
</strong></center>
            {favourites.map(favourite => {

                let product=favourite.products
            return <h5 key={favourite.id} style={{minHeight:'50px'}}>
                <img src={'/storage'+product.image} width='50' height='50' />
                <Link to={'/product/show/' + favourite.product_id}>{favourite.products.product_name}</Link>
                <span className='float-right'><CartButton productData={{...product,offers:favourite.offer,image:undefined}} /></span>
    </h5>
})}
        </div>
    )
}
