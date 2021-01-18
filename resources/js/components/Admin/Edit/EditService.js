import React, { Component } from 'react'
async function getEditData(table, id) {
    return await axios.get("http://localhost:8000/admin/tables/" + table + "/" + id + "/edit")
}
export default class EditService extends Component {
    constructor(props) {
        super(props)
        this.sendForm = this.sendForm.bind(this)

        this.state = {
            isLoading: true,
            changedData: '',

        }
    }


    tableLowerCase = this.props.table.toLowerCase();


    componentDidMount() {
        let id = this.props.match.params.id
        var storeData = {}
        getEditData(this.tableLowerCase, id).then(response => {
            Object.keys(response.data).map(res =>
                storeData[res] = response.data[res]
            )
            this.setState({
                storeData,
                isLoading: false,
            })
        })
    }

    state = {

        token: csrf_token
    }


    //Start Custom Functions
    sendForm(prop) {
        if (this.state.changedData == '') {
            this.props.history.push('/admin/tables/' + this.props.table.toLowerCase())
        }else if(this.state.successMessage){
            console.warn('wait')
        }
         else {

            axios.put("http://localhost:8000/admin/tables/" + this.props.table.toLowerCase() + "/" + this.props.match.params.id, this.state.changedData).then(res => {
                if (res.data.successMessage) {
                    this.setState({
                        openMessage: true,
                        successMessage: res.data.successMessage
                    })

                    setTimeout(() => { this.props.history.push("/admin/tables/" + this.props.table.toLowerCase()) }, 3000)
                } else {
                    this.setState({
                        errors: res.data.errors
                    })
                }

            }).catch(res =>
                this.setState({
                    errors: res.response.data.errors
                })

            )
        }
    }


    handleChange(e) {
        this.setState({

            changedData: {
                ...this.state.storeData, ...this.state.changedData, [e.target.name]: e.target.value
            }
        })

    }


    selectFile(e) {
        this.setState({
            selectFile: {
                'file': e.target.files[0],
                name: e.target.name
            }
        })
    }


    handleFile() {

        let file = this.state.selectFile.file;
        let name = this.state.selectFile.name
        const formData = new FormData()
        formData.append(name, file);

        axios.post('/store', formData, {
            onUploadProgress: processEvent => {
                console.log(Math.round((processEvent.loaded / processEvent.total) * 100) + '%')
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            },

        }).then(res => {
            this.setState({
                changedData: {
...this.state.storeData,
                    ...this.state.changedData,
                    [name]: res.data
                }
            })

        })
    }


    handleClose() {
        this.setState({
            openMessage: false
        })
    }
}
