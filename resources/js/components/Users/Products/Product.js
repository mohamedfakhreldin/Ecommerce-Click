import Rating from "@material-ui/lab/Rating";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { productShow } from "../style";
import CartButton from "../Cart/CartButton";
import ProductsPage from "./ProductsPage";
import { cookies } from "../apiRequest/Cookes";

import { Grid } from "@material-ui/core";
import { addProductsDispatch } from "../ReduxStore/dispatch";
import { apiRequest } from "../apiRequest/APIFunction";
const getProductsbyCategory = async (category, page) => {
    document.title = UpperFirstLetter(category);
    return cookies.get("token")
        ? await apiRequest("products/" + category + "/?page=" + page)
        : await Axios.get("/api/products/" + category + "/?page=" + page);
};
function UpperFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
const getProductsbySearching = async (path, page) => {
    document.title = "Search";
    let searchquery = new URLSearchParams(window.location.search).get("q")
        ? new URLSearchParams(window.location.search).get("q")
        : (window.location = "/");
    path === "/search/" || path === "/search" ? true : (window.location = "/");
    let params = {
        q: searchquery,
        page: page
    };
    return cookies.get("token")
        ? await apiRequest("products/search/", {}, params)
        : await Axios.get("/api/products/search/", { params });
};
function Product(props) {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(
        new URLSearchParams(window.location.search).get("page")
            ? new URLSearchParams(window.location.search).get("page")
            : 1
    );
    function UpperFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    useEffect(() => {
        isLoading ? null : setIsLoading(true);
        let category = props.match.params.category;

        let request = category
            ? getProductsbyCategory(category, page)
            : getProductsbySearching(props.location.pathname, page);
        request.then(res => {
            dispatch(addProductsDispatch(res.data));
            setProductData(res.data);
            setIsLoading(false);
        });
    }, [props.match.params.category, props.location.search, page]);

    const LoadingElement = numberOfElements => {
        let output = [];
        let i = 0;
        while (i < numberOfElements) {
            output.push(
                <div key={i} className={"col-lg-3"}>
                    <Skeleton variant="rect" width={230} height={218} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <br />
                </div>
            );
            i++;
        }
        return output;
    };

    return (
        <div
            className={"container"}
            style={{ backgroundColor: "white", padding: "30px" }}
        >
            <h1>Products</h1>

            {isLoading ? (
                <>
                    <div className="row">{LoadingElement(12)}</div>
                </>
            ) : (
                <>
                 <p align='right' style={{color:'lightgray'}} className='justify-content-right w-100'>{(products).total} Products are found</p>
                    <ProductsPage />
                    <Grid container alignItems="center" justify="center">
                        <Pagination
                            style={{ margin: "20px " }}
                            count={products.last_page}
                            page={products.current_page}
                            onChange={(e, value) => setPage(value)}
                            spacing={4}
                            variant="outlined"
                            shape="rounded"
                        />
                    </Grid>
                </>
            )}
        </div>
    );
}

export default Product;
