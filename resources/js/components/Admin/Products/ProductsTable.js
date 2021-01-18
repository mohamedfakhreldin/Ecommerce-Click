import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { productShow } from "../../Users/style";
import RejectForm from "./RejectForm";
import ReasonShow from "../../Users/Store/ReasonShow";
import Loading from "../../Users/Loading";

export default function ProductsTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activedProducts, setActivedProducts] = useState([]);
  const [rejectedProducts, setRejectedProducts] = useState([]);
  const [reasonForm, setReasonForm] = useState(false);
  const [activeLoading, setActiveLoading] = useState(false)
  const [RejectionReason, setRejectionReason] = useState(false);
  useEffect(() => {
    Axios.get("/admin/tables/products").then(res => {
      setData(res.data);
      setLoading(false);
    });
  }, []);
  const rejection = (index, reason) => {
    let newData = data;
    newData[index]["rejection_reason"] = reason;

    setData([...newData]);
  };
  const confirmProduct =(productID,index)=>{
    setActiveLoading(productID)
    Axios.post('/admin/dashboard/status/'+productID).then(res=>{
let newData =  data
newData[index].status=newData[index].status===1?0:1
setData([...newData])
setActiveLoading(false)
    })
  }
  return loading ? (
    ""
  ) : (
    <div className="content-wrapper">
    <div
      className="container-fluid"

    >
      {reasonForm ? (
        <RejectForm
          productIDAndIndex={reasonForm}
          reject={(index, reason) => rejection(index, reason)}
          closeForm={() => setReasonForm(false)}
        />
      ) : RejectionReason ? (
        <ReasonShow
          reason={RejectionReason}
          closeReason={() => setRejectionReason(false)}
        />
      ) : null}
    <center style={{padding:'20px'}}>
      <h1><b>Products</b></h1>
      </center>
      <table className="table table-hover" style={{backgroundColor:'white'}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Title</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.id}</td>
                <td>
                  <Link
                    target="_blank"
                    to={
                      product.status === 0
                        ? "/admin/product/show/" + product.id
                        : "/product/show/" + product.id
                    }
                  >
                    {product.product_name}
                  </Link>
                </td>
                <td>{product.category.category_name}</td>
                <td>
                  {activeLoading===product.id?      <div className="spinner-border text-success " role="status">
                    <span className="sr-only">Loading...</span>
                </div>:product.status===0?product.rejection_reason !== null ||
                  rejectedProducts.includes(product.id) ? (
                    <button
                      type="button"
                      onClick={() =>
                        setRejectionReason(product.rejection_reason)
                      }
                      className="btn btn-info"
                    >
                      Rejection Reason
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setReasonForm({ id: product.id, index })}
                      className="btn btn-danger"
                    >
                      Reject
                    </button>
                  ):null}

                  {activeLoading===product.id?null:product.rejection_reason !== null ? null : product.status ==
                      1 || activedProducts.includes(product.id) ? (
                    "Actived"
                  ) : (
                    <button
                      onClick={() => confirmProduct(product.id, index)}
                      className={"btn btn-success"}
                    >
                      Active
                    </button>
                  )}
                  {activeLoading===product.id?null:product.status===1?    <button
                      onClick={() => confirmProduct(product.id, index)}
                      className={"btn btn-warning"}
                      style={{marginLeft:'20px'}}
                    >
                      Deactive
                    </button>:null
                    }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
}
