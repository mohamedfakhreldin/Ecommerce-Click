import React, { Component } from 'react'

export default class EditPage extends Component {
    constructor(props){
        super(props)

        this.state={
            ...props
        }
    }
    render() {
        if(this.state.isLoading){
            return <h1>Loading</h1>
        }else{

            return (

                <div className="content-wrapper">
                {!this.state.errors ? '' :
                    <div className="alert alert-danger" role="alert">

                        {Object.keys(this.state.errors).map(error =>
                            <h4>{this.state.errors[error]}</h4>
                            )}
                    </div>
                }

                <center><h1>Edit {this.props.table}</h1></center>
                <Form table={this.props.table} changedData={this.state.changedData} storeData={this.state.storeData ? this.state.storeData : ''} handleChange={this.handleChange.bind(this)} />

                <button onClick={() => this.sendForm(this.state.token)} className='btn btn-primary'>Submit</button>
            </div>
        )
    }
    }
}
