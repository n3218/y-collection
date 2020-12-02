import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"
import axios from "axios"

export const cartAddItemAction = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
      }
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
  } catch (error) {
    // dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
  }
}

export const cartRemoveItemAction = id => async (dispatch, getState) => {
  console.log("cartRemoveItemAction: " + id)
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
  } catch (error) {
    // dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
  }
}
