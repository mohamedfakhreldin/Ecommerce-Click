import { createStore } from 'redux'
import { removeFromCartAction, addToCartAction, clearAllAction, changeQuantityAction, addProductsAction } from './action'
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_ALL, CHANGE_QUANTITY, ADD_PRODUCTS } from './types';


const reducers = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return addToCartAction(state, action)
            break;

        case REMOVE_FROM_CART:
            return removeFromCartAction(state, action)
            break;
        case CLEAR_ALL:
            return clearAllAction(state)
            break;
        case CHANGE_QUANTITY:
            return changeQuantityAction(state, action)
            break;
             case ADD_PRODUCTS:
                 return addProductsAction(state,action)
             break;
        default:
            return intialState
            break;
    }
}
const intialState = {
    cartProducts: sessionStorage.getItem('products') ? JSON.parse(sessionStorage.getItem('products')) : []
}

export default createStore(reducers, intialState)
