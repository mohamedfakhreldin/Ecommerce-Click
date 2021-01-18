import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Select from "./Select";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CustomDiaglog from "../Users/CustomDialog";
async function getTableData(table) {
  const response = await axios.get("/admin/tables/" + table);
  return response;
}
class Table extends Component {
  constructor(props) {
    super(props);
    this.Back = this.Back.bind(this);
    this.sendAction = this.sendAction.bind(this);
    this.state = {
      isLoading: true,
      deleteConfirmation: false
    };
  }
  state = {};
  tableLowerCase = this.props.table.toLowerCase();

  componentDidMount() {
    let options = {};
    getTableData(this.tableLowerCase).then(res => {
      var response =
        res.data.length > 0 ? Object.keys(res.data[0]) : ["column"];

      this.setState({
        tableData: res.data,
        colName: response,
        isLoading: false
      });
    });
  }

  orderBy(col) {
    return this.setState({
      tableData: this.state.tableData.sort((a, b) => b[col] - a[col])
    });
  }

  sendAction(deleteTarget, item) {
    const data = this.state.tableData;

    axios
      .delete("/admin/tables/" + this.tableLowerCase + "/" + deleteTarget)
      .then(response => {
        data.splice(item, 1);
        this.setState({
          ...this.state,
          tableData: data,
          successMessage: response.data.successMessage,
          openMessage: true
        });
        this.closeDeleteConfirmationMessage();
      });
  }

  SendUpdateStatus = (table, id, index) => {
    axios.put("/admin/tables/" + table + "/updatestatus/" + id).then(() => {
      let data = this.state.tableData;
      data[index].status = 1;
      this.setState({
        ...data
      });
    });
  };
  closeDeleteConfirmationMessage() {
    this.setState({
      ...this.state,
      deleteConfirmation: false
    });
    console.log('done');
  }
  openDeleteConfirmationMessage(target, index) {
    this.setState({
      ...this.state,
      deleteConfirmation: { target, index }
    });
  }
  Back() {
    props.history.push("/admin");
  }

  RareCondition = ({ data, col, index }) => {
    let condition = {
      Color: (
        <div
          style={{
            backgroundColor: data[col],
            width: "100%",
            height: "60px"
          }}
        ></div>
      ),
      Location: [
        <a target="_blank" href={data[col]}>
          Location
        </a>
      ],
      status: (
        <button
          onClick={() =>
            this.SendUpdateStatus(this.tableLowerCase, data.ID, index)
          }
          className="btn btn-default"
        >
          {data[col] === 0 ? "Active" : "Activated"}
        </button>
      )
    };
    return condition[col] ? condition[col] : data[col];
  };
  getOptions = e => {
    axios
      .get("/admin/tables/" + this.tableLowerCase, {
        params: {
          action: "search",
          column: this.state.selectColumn,
          search_query: e.target.value,
          table: this.props.table.toLowerCase()
        }
      })
      .then(response => {
        this.setState({
          tableData: response.data
        });
      });
  };

  handleClose() {
    this.setState({
      openMessage: false,
      successMessage: null
    });
  }
  DeleteConfirmationComponent = ({ target, index }) => {
    return (
      <CustomDiaglog toggle={()=>this.closeDeleteConfirmationMessage()}>
        Are You Sure ?
        <hr />
        <button
          onClick={() => this.sendAction(target, index)}
          className="btn btn-danger"
        >
          Yes
        </button>
        <button
          onClick={()=>this.closeDeleteConfirmationMessage()}
          className="btn btn-light"
        >
          No
        </button>
      </CustomDiaglog>
    );
  };
  handleChange = e => {
    this.setState({
      selectColumn: e.target.value
    });
  };
  render() {
    if (this.state.isLoading) {
      return <h1>Loading</h1>;
    }
    return (
      <>
        {this.state.deleteConfirmation ? (
          <this.DeleteConfirmationComponent
            target={this.state.deleteConfirmation.target}
            index={this.state.deleteConfirmation.index}
          />
        ) : null}
        <Snackbar
          open={this.state.openMessage}
          autoHideDuration={3000}
          onClose={() => this.setState({ openMessage: false })}
        >
          <Alert
            onClose={() => this.setState({ openMessage: false })}
            severity="error"
          >
            {this.state.successMessage ? this.state.successMessage : null}
          </Alert>
        </Snackbar>

        <div className="content-wrapper">
          <center style={{ padding: "20px" }}>
            <h1>
              <b>{this.props.table}</b>
            </h1>
          </center>

          {/* <div className=' container table-search-box'>

                        <Select inputName='column' handleChange={this.handleChange.bind(this)} inputOptions={this.state.options} />
                        <input type='text' onChange={this.getOptions} className='form-control search-box' name='search_query' />
                    </div> */}
          {this.props.disableCreate ? null : (
            <Link
              style={{ margin: 15 }}
              to={"/admin/tables/" + this.tableLowerCase + "/create"}
              className="btn btn-info"
            >
              <i className="fa fa-plus"></i> Create {this.props.table}
            </Link>
          )}

          <section className="content">
            <div className="container-fluid">
              {this.state.tableData.length === 0 ? (
                <h5 align="center">
                  <strong>There is no data</strong>
                </h5>
              ) : (
                <table
                  id="example2"
                  style={{ backgroundColor: "white" }}
                  className="table table-bordered table-hover"
                >
                  <thead>
                    <tr>
                      {this.state.colName.map((col, index) => (
                        <th
                          key={index}
                          style={{
                            cursor: "pointer"
                          }}
                          onClick={() => this.orderBy(col)}
                        >
                          {col}
                        </th>
                      ))}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tableData.map((data, index) => (
                      <tr key={index}>
                        {this.state.colName.map((col, index2) => (
                          <td key={index2}>
                            {data[col] == null ? (
                              "empty"
                            ) : data[col].constructor == {}.constructor ? (
                              <a
                                href={
                                  this.props.related[col]
                                    ? this.props.related[col] +
                                      "/" +
                                      data[col].id
                                    : ""
                                }
                              >
                                {data[col].Name}
                              </a>
                            ) : (
                              <this.RareCondition
                                index={index}
                                data={data}
                                col={col}
                              />
                            )}
                          </td>
                        ))}

                        <td>
                          <button
                            id={index}
                            value={data["ID"]}
                            onClick={() =>
                              this.openDeleteConfirmationMessage(data.ID, index)
                            }
                            any={data["ID"]}
                            className="btn btn-danger "
                          >
                            <i className="fa fa-trash"></i> Delete
                          </button>
                          <Link
                            to={
                              "/admin/tables/" +
                              this.tableLowerCase +
                              "/" +
                              data["ID"] +
                              "/edit"
                            }
                            className="btn btn-success "
                          >
                            <i className={"fa fa-edit"}></i> Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </>
    );
  }
}
export default withRouter(Table);
