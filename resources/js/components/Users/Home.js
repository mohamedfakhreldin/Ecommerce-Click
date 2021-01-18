import React, { useEffect, useState } from "react";
import { apiRequest } from "./apiRequest/APIFunction";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProductsDispatch } from "./ReduxStore/dispatch";
import ProductItem from "./Products/ProductItem";
import { cookies } from "./apiRequest/Cookes";
import { Carousel } from "react-bootstrap";

export default function Home() {
  const products = useSelector(state => state.products);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title='Click'
    let request = cookies.get("token")
      ? apiRequest("home")
      : Axios.get("/api/home");
    request.then(res => {
      dispatch(addProductsDispatch(res.data));
      setIsLoading(false);
    });
  }, []);
  const ItemsContainer = ({ header, children }) => {
    return (
      <>
        <h1 className="home-products-header"> {header} </h1>
        <br />
        <div className="row justify-content-center">{children}</div>
      </>
    );
  };
  return isLoading ? (
    ""
  ) : (
    <div className={"container-fluid home-container"}>
      <Carousel fade controls={false} style={{ height: "600px" }}>
        <Carousel.Item interval={4000}>
          <img
            src="/img/photo-1505740420928-5e560c06d30e.jpeg"
            className="d-block w-100 h-100"
            alt="..."
          />

          <Carousel.Caption>
            <h3>Nice Shopping</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            src="/img/photo-1523275335684-37898b6baf30.jpeg"
            className="d-block w-100 h-100"
            alt="..."
          />

          <Carousel.Caption>
            <h3>Suitable Price</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            src="/img/ProductPush_4434970OLFT2535_001_Light.jpg"
            className="d-block w-100 h-100"
            alt="..."
          />

          <Carousel.Caption>
            <h3>Best Offers</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            src="/img/glasses-2110273_1280.jpg"
            className="d-block w-100 h-100"
            alt="..."
          />

          <Carousel.Caption>
            <h3>High Quality</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <ItemsContainer header="Top Selling">
        {products.selling.map((product, index) => (
          <div key={index} style={{ marginTop: "20px" }} className={"col-lg-2"}>
            <ProductItem
            disableFavouriteButton
              productData={product}
              productReduxName={"selling"}
              index={index}
            />
          </div>
        ))}
      </ItemsContainer>
      <ItemsContainer header="Latest Products">
        {products.latest.map((product, index) => (
          <div key={index} style={{ marginTop: "20px" }} className={"col-lg-2"}>
            <ProductItem
            disableFavouriteButton
              productData={product}
              productReduxName={"latest"}
              index={index}
            />
          </div>
        ))}
      </ItemsContainer>
      <ItemsContainer header="Top Discount">
        {products.discount.map((product, index) => (
          <div key={index} style={{ marginTop: "20px" }} className={"col-lg-2"}>
            <ProductItem
            disableFavouriteButton
              productData={product}
              productReduxName={"discount"}
              index={index}
            />
          </div>
        ))}
      </ItemsContainer>

      <ItemsContainer header="Products">
        {products.random.map((product, index) => (
          <div key={index} style={{ marginTop: "20px" }} className={"col-lg-2"}>
            <ProductItem disableFavouriteButton
              productData={product}
              productReduxName={"random"}
              index={index}
            />
          </div>
        ))}
      </ItemsContainer>
    </div>
  );
}
