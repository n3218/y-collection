import { createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { applyMiddleware } from "redux"
import { productListReducer, productDetailsReducer } from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./reducers/userReducers"
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from "./reducers/orderReducers"

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer
})

const cartItemsFromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}
const paymentMethodFromStorage = localStorage.getItem("payMentMethod") ? JSON.parse(localStorage.getItem("payMentMethod")) : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage
  },
  userLogin: { userInfo: userInfoFromLocalStorage }
}

const midleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...midleware)))

export default store
