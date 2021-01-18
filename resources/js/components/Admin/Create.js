import React, { Component } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import * as FormInputData from "./FormData";
import Form from "./Form";
import { Snackbar } from "@material-ui/core";
class Create extends Component {
    constructor(props) {
        super(props);
        this.sendForm = this.sendForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.state = {
            openMessage: false,
            isLoading: true,
            changedData: "",
            token: csrf_token
        };
    }
    componentDidMount() {
        let isLoading = false;
        //get select option if form have select input
        {
            this.props.optionsRequest
                ? axios
                      .get(
                          "/admin/tables/" +
                              this.props.table.toLowerCase() +
                              "/create"
                      )
                      .then(res => {
                          this.setState({
                              storeData: res.data,
                              isLoading
                          });
                      })
                : this.setState({ isLoading });
        }
        let form = FormInputData[this.props.table + "FormData"]();
        this.setState({ form });
    }

    //Start Custom Functions

    sendForm(prop) {
        if (
            (this.state.password || this.state.passwordConfirm) &&
            this.state.password !== this.state.passwordConfirm
        ) {
            this.setState({
                errors: {
                    password: ["The password confirmation does not match."]
                }
            });
        } else {
            var storeData = {};

            axios
                .post(
                    "http://localhost:8000/admin/tables/" +
                        this.props.table.toLowerCase(),
                    this.state.changedData
                )
                .then(res => {
                    if (res.data.successMessage) {
                        this.setState({
                            openMessage: true,
                            successMessage: res.data.successMessage
                        });
                        setTimeout(() => {
                            this.props.history.push(
                                "/admin/tables/" +
                                    this.props.table.toLowerCase()
                            );
                        }, 3000);
                    }
                })
                .catch(res =>
                    this.setState({
                        errors: res.response.data.errors
                    })
                );
        }
    }

    handleChange(e) {
        this.setState({
            changedData: {
                ...this.state.changedData,
                [e.target.name]: e.target.value
            }
        });
    }
    selectFile(e) {
        this.setState({
            selectFile: {
                ...this.state.selectFile,
                file: e.target.files[0],
                name: e.target.name
            }
        });
    }
    handleFile() {
        let file = this.state.selectFile.file;
        let name = this.state.selectFile.name;
        const formData = new FormData();
        formData.append(name, file);

        axios
            .post("/store", formData, {
                onUploadProgress: processEvent => {
                    this.setState({
                        selectFile: {
                            ...this.state.selectFile,

                            progess:
                                Math.round(
                                    (processEvent.loaded / processEvent.total) *
                                        100
                                ) + "%"
                        }
                    });
                },
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .catch(errors => {
                this.setState({
                    errors: errors.response.data.errors
                });
            })
            .then(res => {
                this.setState({
                    changedData: {
                        ...this.state.changedData,
                        [name]: res.data
                    },
                    selectFile: {
                        ...this.state.selectFile,
                     
                    }
                });
                // setTimeout(() => {
                //     this.setState({
                //         selectFile: {
                //             ...this.state.selectFile,
                //             progess: 0
                //         }
                //     });
                // }, 3000);
            });
    }
    handleClose() {
        this.setState({
            openMessage: false,
            successMessage: null
        });
    }
    //End Custon Function
    render() {
        if (this.state.isLoading) {
            return "";
        }
        return (
            <div
                className="content-wrapper"

            >
                <Snackbar
                    open={this.state.openMessage}
                    autoHideDuration={6000}
                    onClose={() => this.setState({ openMessage: false })}
                >
                    <Alert
                        onClose={() => this.setState({ openMessage: false })}
                        severity="success"
                    >
                        {this.state.successMessage
                            ? this.state.successMessage
                            : null}
                    </Alert>
                </Snackbar>
                <section className={"content"}>
                    <center
                        style={{ padding: "20px" /*backgroundColor:'white'*/ }}
                    >
                        <h1
                            style={{
                                marginTop: "25px" /*backgroundColor:'white'*/
                            }}
                        >
                            <span
                                style={{
                                    backgroundColor: "red",
                                    color: "white",
                                    padding: "20px"
                                }}
                            >
                                Create
                            </span>{" "}
                            {this.props.table}
                        </h1>
                    </center>
                    {!this.state.errors ? (
                        ""
                    ) : (
                        <>
                            {Object.keys(this.state.errors).map(error => (
                                <Alert severity="error">
                                    {this.state.errors[error]}
                                </Alert>
                            ))}
                        </>
                    )}

                    <Form
                        selectFileFunction={
                            this.props.hasFile
                                ? this.selectFile.bind(this)
                                : false
                        }
                        selectFile={
                            this.props.hasFile ? this.state.selectFile : false
                        }
                        changedData={this.state.changedData}
                        handleFile={
                            this.props.hasFile
                                ? this.handleFile.bind(this)
                                : false
                        }
                        storeData={
                            this.state.storeData ? this.state.storeData : ""
                        }
                        table={this.props.table}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <button
                        onClick={() => this.sendForm(this.state.token)}
                        className="btn btn-primary"
                    >
                        Submit
                    </button>
                </section>
            </div>
        );
    }
}
export default withRouter(Create);
