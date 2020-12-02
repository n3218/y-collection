import { createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { applyMiddleware } from "redux"
import { productListReducer, productDetailsReducer } from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer
})

const cartItemsFromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []

const initialState = {
  products: [],
  cart: { cartItems: cartItemsFromLocalStorage }
}

const midleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...midleware)))

export default store
