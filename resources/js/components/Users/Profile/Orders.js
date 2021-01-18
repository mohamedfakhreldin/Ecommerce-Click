import React, { useEffect, useState, useRef } from "react";
import { apiRequest } from "../apiRequest/APIFunction";
import { Link } from "react-router-dom";
import { SessionFlushMessage } from "../apiRequest/SessionFlush";
import Alert from "@material-ui/lab/Alert";
import {
  Collapse,
  StepButton,
  Step,
  Stepper,
  StepLabel,
  Typography,
  MuiThemeProvider
} from "@material-ui/core";
import Loading from "../Loading";
//import getMuiTheme from 'material-ui/styles/getMuiTheme'
export default function Orders() {
  const [orders, setOrders] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [toggle, settoggle] = useState({});
  const [storeOrderToggle, setStoreOrderToggle] = useState({});
  const [storeOrderItem, setStoreOrderItem] = useState({});
  const [storeInfo, setStoreInfo] = useState({});
  const [date, setDate] = useState("");
  useEffect(() => {
    apiRequest("profile/orders").then(res => {
      setOrders(res.data);
      setIsLoading(false);
    });
  }, []);

  const getStoreOrderItems = (orderID, newIndex) => {
    storeOrderToggle[newIndex]
      ? setStoreOrderToggle({ ...storeOrderToggle, [newIndex]: false })
      : setStoreOrderToggle({ ...storeOrderToggle, [newIndex]: true });
    storeOrderItem[orderID]
      ? ""
      : apiRequest("profile/order/items/" + orderID).then(res =>
          setStoreOrderItem({
            ...storeOrderItem,
            [orderID]: res.data
          })
        );
  };
  const collapsed = useRef();
  const collapseToggle = element => {
    const oldClassName = document.getElementById(element)["aria-expended"];
    const newClassName = oldClassName === "true" ? "false" : "true";
    document.getElementById(element)["aria-expended"] = newClassName;
  };
  const CollapseContainer = props => {
    return (
      <div className="accordion" id={props.id}>
        <div>
          <div
            id={"heading" + props.id}
            style={{ width: "100%" }}
            className="float-right "
          >
            <h2 className="mb-0">
              <button
                className="btn btn-light float-right "
                type="button"
                data-toggle="collapse"
                data-target={"#collapse" + props.id}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                X
              </button>
            </h2>
          </div>
          <div
            id={"collapse" + props.id}
            className="collapse"
            aria-labelledby={"heading" + props.id}
            data-parent={"#" + props.id}
          ></div>
          <br />
        </div>
        {props.children}
      </div>
    );
  };

  const checkDate = (orderDate, index) => {
    if (index === 0) {
      return (
        <h3 style={{ margin: "20px", textAlign: "right" }}>
          <b>{orderDate}</b>
        </h3>
      );
    } else {
      return orders[index - 1].created_date === orderDate ? null : (
        <h3 style={{ margin: "20px", textAlign: "right" }}>
          <b>{orderDate}</b>
        </h3>
      );
    }
  };

  // const muiTheme = getMuiTheme({
  //     stepper: {
  //         iconColor: 'green' // or logic to change color
  //     }
  // })
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <SessionFlushMessage messageName="success" />

      <center>
        <strong>My Orders</strong>
        <p>The orders will arrive within 15 days</p>
      </center>
      {orders.map((order, index) => {
        return (
          <>
            {checkDate(order.created_date, index)}
            <Collapse key={index} in={toggle[index]} collapsedHeight={60}>
              <div className="card order-card">
                <div
                  className="card-header"
                  onClick={() =>
                    toggle[index]
                      ? settoggle({ ...toggle, [index]: false })
                      : settoggle({ ...toggle, [index]: true })
                  }
                  
                >
                  <h4>
                    Order#{order.id}
                    <span className="float-right">{order.created_date}</span>
                  </h4>
                </div>

                <div className="card-body">
                  {order.order_items.map((storeOrder, index2) => {
                    let newIndex = index + "" + index2;
                    let activeProccess = storeOrder.status;
                    return (
                      <Collapse key={index}
                        in={storeOrderToggle[newIndex]}
                        collapsedHeight={60}
                      >
                        <div className="card order-card">
                          <div
                            className="card-header"
                            onClick={() =>
                              getStoreOrderItems(storeOrder.id, newIndex)
                            }

                          >
                            <h5>StoreOrder#{storeOrder.id} </h5>
                          </div>
                          <div className="card-body">
                            {storeOrderItem[storeOrder.id] ? (
                              <>
                                <center>
                                  <b></b>
                                </center>
                                <MuiThemeProvider>
                                  <Stepper
                                    alternativeLabel
                                    activeStep={activeProccess===2?activeProccess+1:activeProccess}
                                  >
                                    <Step>
                                      <StepLabel style={{ color: "green" }}>
                                        {"Active"}
                                      </StepLabel>
                                    </Step>
                                    <Step>
                                      <StepLabel style={{ color: "green" }}>
                                        {"Shipping"}
                                      </StepLabel>
                                    </Step>

                                    <Step>
                                      <StepLabel style={{ color: "green" }}>
                                        {activeProccess===3?'Delivery Failed':"Delivery Successfully"}
                                      </StepLabel>
                                    </Step>
                                  </Stepper>
                                </MuiThemeProvider>

                                {storeOrderItem[storeOrder.id].map((eachItem, index) => {
                                  storeInfo[storeOrder.id]
                                    ? null
                                    : setStoreInfo({
                                        ...storeInfo,
                                        [storeOrder.id]: eachItem.store_order
                                      });

                                  activeProccess = activeProccess
                                    ? activeProccess
                                    : eachItem.store_order.status;
                                  return (
                                    <h5 key={index}>
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
                                          {eachItem.price +' EGP'}
                                        </span>
                                      </Link>
                                    </h5>
                                  );
                                })}
                                   <h5>
                                <b>Sub Total:</b>
                                <span className="float-right">
                                          {storeOrder.total+ ' EGP'}
                                        </span>
                                </h5>
                                <h5>
                                <b>Discount: </b>
                                <span className="float-right">
                                          {storeOrder.discount+ ' EGP'}
                                        </span>
                                </h5>
                                <h5>
                                <b>Total:</b>
                                <span className="float-right">
                                          {storeOrder.total-storeOrder.discount+ ' EGP'}
                                        </span>
                                </h5>
                                {storeInfo[storeOrder.id]
                                  ? storeInfo[storeOrder.id].store_name
                                  : null}
                              </>
                            ) : (
                              <Loading />
                            )}
                          </div>
                        </div>
                      </Collapse>
                    );
                  })}
                </div>
              </div>
            </Collapse>
          </>
        );
      })}

    </div>
  );
}
