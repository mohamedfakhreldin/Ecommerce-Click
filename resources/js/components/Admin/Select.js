import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'

async function getOptions(table,id) {
  return await axios.get('/admin/get' + table + 'options', { params: { id: id } })
}
class Select extends Component {

     constructor(props) {
         super(props)

        this.state={

            isLoading:true
        }
    }

    componentDidMount() {
        var isLoading=false
        !this.props.inputOptions || this.props.inputOptions ==''|| this.props.inputOptions==undefined ? '' : (this.props.inputOptions[0]).constructor==={}.constructor?
        this.setState({
            inputOptions:this.props.inputOptions,
            isLoading
        })
        :
        getOptions(this.props.inputOptions,this.props.match.params.id).then(response => {
            this.setState({
                inputOptions: response.data,
                isLoading
        })


    })
}

    render() {
        if(this.state.isLoading){
            return ''
        }
        return (


            <select type={this.props.inputType}
                onChange={this.props.handleChange}
                value={this.props.inputValue}
                className={this.props.inputClass}
                name={this.props.inputName} >
                <option value=''>
                    Select {this.props.inputLabel}
                </option>
                {!this.state.inputOptions || this.state.inputOptions == ''  ||this.state.inputOptions==undefined || (this.state.inputOptions).length ==0 ? <option value=''>no data recived</option> :
                    Object.keys(this.state.inputOptions).map((option, index) => {

                        return <option key={index} value={this.state.inputOptions[option]['value']}>{this.state.inputOptions[option]
                            .label}</option>
                    }
                    )
                }

            </select>
        )
    }
}
export default withRouter(Select)
