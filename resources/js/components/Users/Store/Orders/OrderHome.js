import React, { useEffect, useState } from "react";
import { apiRequest } from "../../apiRequest/APIFunction";
import Table from "../Table";
import { Link } from "react-router-dom";
import ShowCustomerData from "./ShowCustomerData";
import NavLink from "../../Navbar/NavLink";
import { catchingErrors } from "../../apiRequest/catch";
import ShowOrderProducts from "./ShowOrderProducts";

export default function OrderHome(props) {
  const [activeCustomer, setActiveCustomer] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let path = props.location.pathname.substring(1);
    let search = props.location.search;
    apiRequest(path + search)
      .then(res => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch(errors => catchingErrors(errors));
  }, [props.location.search]);

  const openCustomer = (customer, type, address=null) => {
    let data ={
      type,
      data:customer
    }
    address?    data.data.address = address:false;
    customer.type=type
    setActiveCustomer(data);
  };

  const updateOrder = (id, status, index) => {
    let editedOrder = orders;
    editedOrder[index].status = status;
    apiRequest("store/orders/status/update/" + id, { status }, null, "post")
      .then(() => {
        setOrders([...editedOrder]);
      })
      .catch(errors => catchingErrors(errors));
  };
  const activeLink = (status = null) =>
    status === props.location.search.status ? "nav-item active" : "nav-item";
  return (
    <div>
      {activeCustomer.type == 'user' ? (
        <ShowCustomerData
          closeUser={() => setActiveCustomer(false)}
          user={activeCustomer.data}
        />
      ) : activeCustomer.type ==='order'?
    <ShowOrderProducts closeOrder={()=>setActiveCustomer(false)}
    orderData={activeCustomer.data}/>:null }
      <ul className="nav nav-tabs">
        <NavLink activeClass={"active"} to="/store/dashboard/orders/">
          All
        </NavLink>

        <NavLink activeClass={"active"} to="/store/dashboard/orders/?status=1">
          Actived
        </NavLink>

        <NavLink activeClass={"active"} to="/store/dashboard/orders/?status=0">
          Pending
        </NavLink>

        <NavLink activeClass={"active"} to="/store/dashboard/orders/?status=2">
          Delivery Successfully
        </NavLink>

        <NavLink
          activeClass={"active"}
          to="/store/dashboard/orders/?status=3"
          aria-disabled="true"
        >
          Delivery Falied
        </NavLink>
      </ul>
      {isLoading ? (
        <div className="spinner-border text-success loading" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <Table
            columns={[
              "OrderID",
              "Sub Total",
              "Total",
              "Status",
              "Change Status",
              "Customer Infomation"
            ]}
            tableData={orders}
          >
            {orders.map((order, index) => {
              return (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.total}</td>
                  <td>{order.total - order.discount}</td>
                  <td>
                    {order.status === 0
                      ? "pending"
                      : order.status == 2
                      ? "Devlivery Success"
                      : order.status == 3
                      ? "Devliery Falied"
                      : "Accepted"}
                  </td>
                  <td>
              {

              order.status===0?

              <button
                      className="btn btn-success"
                      onClick={() => updateOrder(order.id, 1, index)}
                    >
                      Active
                    </button>
                    :              order.status===1?
<>

                    <button
                      className="btn btn-success"
                      onClick={() => updateOrder(order.id, 2, index)}
                    >
                      Sent
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => updateOrder(order.id, 3, index)}
                    >
                      Cancel
                    </button>
                    </>
                  :false
              }
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        openCustomer(order.store_order_customer, 'user', order.address)
                      }
                    >
                      Show
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        openCustomer({id:order.id,total:order.total,discount:order.discount},'order')
                      }
                    >
                      Show Order Products
                    </button>
                  </td>
                </tr>
              );
            })}
          </Table>
        </>
      )}
    </div>
  );
}
