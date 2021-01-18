import React, { Component } from 'react'
import Select from './Select'
import * as FormData from './FormData'
var style = {
    uploadDiv: {
        backgroundColor: "white",
        color: "green",
        width: '40%',
        fontWeight: "bold",
        padding: "15px"
    }
}
export default class Form extends Component {
    constructor(props) {
        super(props)
        // this.handleChange = this.handleChange.bind(this)
        let form = FormData[this.props.table + 'FormData']()
        this.state = {
            isLoading: true,
            storeData: {},
            formData: form
        }
    }

    //Some Variables

    state = {

    }
    componentDidMount() {
        var storeData = this.props.storeData ? this.props.storeData : ''
        var changedData = this.props.changedData

        this.setState({

            storeData,
            changedData,
            token: csrf_token,
            isLoading: false
        })

    }
    componentWillReceiveProps(nextProps) {
        var selectFile = nextProps.selectFile ? nextProps.selectFile : ''

        this.setState({
            selectFile
        })
    }
    handleClick = (e) => {
        this.inputElement.click();
        this.setState({
            [this.inputElement.name]: 'yes'
        })
    }


    render() {
        if (this.state.isLoading) {
            return ''
        }
        return (

            <form encType="multipart/form-data">


                {this.state.formData && Object.keys(this.state.formData).length > 0 ?
                    Object.keys(this.state.formData).map((oneData, index) => {
                        //Input Variables
                        var inputOptions = this.state.formData[oneData].options ? this.state.storeData[this.state.formData[oneData].options] : '';
                        var inputName = this.state.formData[oneData].name ? this.state.formData[oneData].name : oneData;
                        var inputClass = this.state.formData[oneData].class ? this.state.formData[oneData].class : 'form-control';
                        var inputLabel = this.state.formData[oneData].label ? this.state.formData[oneData].label : '';
                        var inputType = this.state.formData[oneData].type ? this.state.formData[oneData].type : 'text'
                        var inputId = this.state.formData[oneData].id ? this.state.formData[oneData].id : null
                        var inputValue = this.props.changedData[inputName] || this.props.changedData[inputName] == '' ?
                            this.state.changedData[inputName] :
                            this.state.storeData[inputName] ?
                                this.state.storeData[inputName] : '';
                        // End Input Variables
                       return <div key={index} className={'form-group'}>
                        {inputType == 'select' ?
                           <>
                           <label>{inputLabel + " : "}</label>
                                <Select InputType={inputType}
                                    handleChange={this.props.handleChange.bind(this)}
                                    inputValue={inputValue}
                                    inputClass={inputClass}
                                    inputName={inputName}
                                    inputOptions={inputOptions} />


</>
                            : inputType == 'file' ? <>
                                <label>{inputLabel + " : "}</label>
                                <input ref={input => this.inputElement = input} type={inputType}
                                    onChange={this.props.selectFileFunction}
                                    value={inputValue}
                                    className={inputClass}
                                    name={inputName}
                                    id={inputId}
                                    hidden
                                />
                                <div style={style.uploadDiv}>{this.props.selectFile ? this.props.selectFile.name + ' the file is selected click upload to upload it' : 'please choose the image'}</div>
                                <div className="progress">
                                    <div className="progress-bar progress-bar-striped bg-warning" style={{ /*display: this.state.selectFile.progess ? 'block' : 'none'*/ }}
                                    role="progressbar" style={{width:this.state.selectFile==undefined || this.state.selectFile.progess==undefined?0:this.state.selectFile.progess }} aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div className="btn btn-info" style={{ float: 'right' }} onClick={this.props.handleFile}>Upload</div>
                                <div className="btn btn-success" style={{ float: 'right' }} onClick={this.handleClick}>Choose File</div>
                            </> :
                                <>
                                    <label>{inputLabel + " : "}</label>
                                    <input type={inputType}
                                        onChange={this.props.handleChange}
                                        value={inputValue}
                                        className={inputClass}
                                        name={inputName}
                                        id={inputId}
                                        placeholder={"Enter your " + inputLabel} />
                        </>
                        }
                                </div>


                    }

                    )



                    :
                    <h2>Hello</h2>}

            </form>


        )
    }

}

