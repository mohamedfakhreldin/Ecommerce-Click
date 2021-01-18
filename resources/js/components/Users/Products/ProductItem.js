import React, { useState, useEffect } from "react";
import CartButton from "../Cart/CartButton";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { productShow } from "../style";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useSelector, useDispatch } from "react-redux";
import { apiRequest } from "../apiRequest/APIFunction";
import { catchingErrors } from "../apiRequest/catch";
import { addProductsDispatch } from "../ReduxStore/dispatch";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from '../Loading'
export const FavouriteButton = ({
    data,
    index,
    className,
    productReduxName
}) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const [Favourite, setFavourite] = useState(
        products
            ? products[productReduxName]
                ? products[productReduxName][index].favourite
                : products[0].favourite
            : []
    );
    const toggleFavourite = (favouriteData, index) => {
        apiRequest("product/favourite", { id: favouriteData }, null, "post")
            .then(() => {
                let data;
                let myIndex = index;
                let result;
                if (productReduxName) {

                    data = products[productReduxName];
                    data[myIndex].favourite === 0
                        ? (data[myIndex].favourite = 1)
                        : (data[myIndex].favourite = 0);
                    setFavourite(data[index].favourite);
                    result = { ...products, [productReduxName]: [...data] };
                } else {
                    data = products;
                    data[myIndex].favourite === 0
                        ? (data[myIndex].favourite = 1)
                        : (data[myIndex].favourite = 0);
                    setFavourite(data[index].favourite);
                    result = [...data];
                }
                dispatch(addProductsDispatch(result));
            })
            .catch(errors => catchingErrors(errors));
    };
    return (
        <FavoriteIcon
            className={
                Favourite === 1
                    ? "favourite-icon active-favourite-icon " + className
                    : "favourite-icon " + className
            }
            onClick={() => toggleFavourite(data.id, index)}
        />
    );
};
export default function ProductItem({ productData, index, productReduxName,disableFavouriteButton }) {
    const [data, setData] = useState(productData);
    useEffect(() => {}, [productData]);
    return (
        <div
            className="card mycard"
        >
           {disableFavouriteButton?null: <FavouriteButton
                productReduxName={productReduxName ? productReduxName : false}
                data={{ id: data.id, favourite: data.favourite, inManyCategory:true }}
                index={index}
            />}
            <Link to={"/product/show/" + data.id} style={productShow.clearLink}>
            <div>
    <LazyLoadImage
      alt=''
      height={200}
      src={ data.image
        ? "/storage" + data.image
        : "/img/SZD-200.png"}
        className="card-img-top"
        beforeLoad={()=><Loading />}
        delayMethod='debounce'
        delayTime={2500}
        placeholderSrc='/img/SZD-200.png'
        effect='blur'

     />

  </div>

                <div className="card-body">
                    <h5 className="card-title">{data.product_name}</h5>
                    <p className="card-text">
                        <Rating
                            name="read-only"
                            value={data.rating_count}
                            readOnly
                        />
                    </p>
                    <p className="card-text">
                        <strong>Price : </strong>
                        {data.offers ? (
                            <>
                                {data.price - data.offers.discount}
                                <b>EGP</b>
                                <span
                                    className="badge badge-light discount-badge"
                                    style={{ float: "right" }}
                                >
                                    {Math.round(
                                        (data.offers.discount / data.price) *
                                            100
                                    )}
                                    % Discount
                                </span>
                                <br />
                                <small>
                                    <del
                                        style={{
                                            left: "75px",
                                            position: "absolute"
                                        }}
                                    >
                                        {data.price}
                                        EGP
                                    </del>
                                </small>
                            </>
                        ) : (
                            data.price + " EGP"
                        )}
                    </p>
                    <p className="card-text">
                        <strong>Trademark : </strong>
                        {data.trademark.name}{" "}
                    </p>
                </div>
            </Link>
            <CartButton productData={data} />
        </div>
    );
}
