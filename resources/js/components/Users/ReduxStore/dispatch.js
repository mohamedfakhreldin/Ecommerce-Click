import { useDispatch } from "react-redux";
import { REMOVE_FROM_CART, CHANGE_QUANTITY, ADD_TO_CART, CLEAR_ALL, ADD_PRODUCTS } from "./types";

export function removeFromCartDispatch(productData) {
    return { type: REMOVE_FROM_CART, productData: productData }
}
export function changeQuantityDispatch(quantity, productData) {
    return { type: CHANGE_QUANTITY, quantity: quantity, data: productData }
}

export function addToCartDispatch(productData) {
    return { type: ADD_TO_CART, productData: productData }

}
export function clearAllDispatch() {
    return { type: CLEAR_ALL }
}
export function addProductsDispatch(data) {
    return {type:ADD_PRODUCTS,data:data}
};
