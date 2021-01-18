import React, { Component } from 'react'
import Edit from './Edit';
import EditPage from './EditPage';

//Admin Edit Component
export class AdminEdit extends Component {
    render() {

        return <Edit table='Admins' />
    }
}

//Category Edit Component
export class CategoryEdit extends Component {
    render() {
        return (
            <Edit hasFile table='Categories' />
        )
    }
}

//User Edit Component
export class UserEdit extends Component {
    render() {
        return (
            <Edit table='Users' />
        )
    }
}

//Color Edit Component
export class ColorEdit extends Component {
    state={
        table:'Colors'
    }
    render() {
        return (
            <Edit {...this.state} />
        )
    }
}

//Store Edit Component
export class StoreEdit extends Component {
    render() {
        return (
            <Edit table='Stores' />
        )
    }
}

//Trademark Edit Component
export class TrademarkEdit extends Component {
    render() {
        return (
            <Edit table='Trademarks' />
        )
    }
}
