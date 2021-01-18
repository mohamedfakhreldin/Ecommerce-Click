import React, { Component } from 'react'
import axios from 'axios'

import {  styled } from '@material-ui/core/styles';
import { CircularProgress, Snackbar } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';
import Form from "../Form"
import EditService from './EditService';
const Progress = styled(CircularProgress)({

        color: 'red',
         margin: 10,
         textAlign: 'center'

});

class Edit extends EditService {


    //End Custon Function
    render() {
        if (this.state.isLoading) {
            return  <center>  <Progress  /> </center>
        } else {

            return (

                <div className="content-wrapper">
                         <Snackbar open={this.state.openMessage} autoHideDuration={6000} onClose={()=> this.setState({openMessage:false  })}>
        <Alert onClose={()=> this.setState({openMessage:false})} severity="success">
           {this.state.successMessage?this.state.successMessage:null}
        </Alert>
      </Snackbar>
                    <center><h1>Edit {this.props.table}</h1></center>
                    {!this.state.errors ? '' :

                        <>
                            {Object.keys(this.state.errors).map(error =>
                                <Alert severity="error">{this.state.errors[error]}</Alert>
                            )}
                        </>

                    }

                    <Form table={this.props.table}
                  selectFileFunction={this.props.hasFile?this.selectFile.bind(this):false}
                  selectFile={this.props.hasFile?this.state.selectFile:false}
                  handleFile={this.props.hasFile?this.handleFile.bind(this):false}
                    changedData={this.state.changedData} storeData={this.state.storeData ? this.state.storeData : ''} handleChange={this.handleChange.bind(this)} />

                    <button onClick={() => this.sendForm(this.state.token)} className='btn btn-primary'>Submit</button>
                </div>
            )
        }
    }
}
export default withRouter(Edit)
