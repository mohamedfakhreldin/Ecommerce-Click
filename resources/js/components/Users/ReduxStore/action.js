export function removeFromCartAction(actionState, action) {
    let newCart = actionState.cartProducts.filter(cartProducts => cartProducts.id !== action.productData.id)
    sessionStorage.setItem('products', JSON.stringify(newCart))

    return {
        ...actionState,
        cartProducts: newCart
    }
}
export function changeQuantityAction(state, action) {
    let data = action.data;
    data.quantity = action.quantity < 1 || action.quantity > data.amount ? 1 : action.quantity
    let cartState = state.cartProducts

    let newData = cartState.map(eachCartProduct => {
        if (eachCartProduct.id === data.id) {
            return {
                ...eachCartProduct,
                quantity: eachCartProduct.quantity,
            }
        }
        return eachCartProduct
    })
    return {
        ...state,
        cartProducts: newData
    }
}

export function addToCartAction(state, action) {
    let dataStored = sessionStorage.getItem('products') ? JSON.parse(sessionStorage.getItem('products')) : []
    let newProduct = action.productData
    newProduct.quantity = 1
    dataStored.push(newProduct)
    sessionStorage.setItem('products', JSON.stringify(dataStored))

    return {
        ...state,
        cartProducts: [...state.cartProducts, newProduct]
    }
}
export function clearAllAction(state) {
    sessionStorage.removeItem('products')
    return {
        ...state,
        cartProducts: []
    }
}
export function addProductsAction(state, action) {
    return {
        ...state,
        products: action.data
    }
}
