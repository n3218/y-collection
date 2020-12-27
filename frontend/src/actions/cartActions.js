import {
  CART_ADD_ITEM, //
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from "../constants/cartConstants"
import axios from "axios"

export const cartAddItemAction = (id, qty, color) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)
  const colorImages = data.color.filter(col => col.name === color)[0].images
  let imgOfColor = ""
  if (colorImages.length > 0) {
    imgOfColor = colorImages[0]
  } else {
    imgOfColor = data.image[0]
  }
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      brand: data.brand,
      fibers: data.fibers,
      meterage: data.meterage,
      minimum: data.minimum,
      image: imgOfColor,
      price: data.price,
      color,
      qty
    }
  })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const cartRemoveItemAction = (id, color) => async (dispatch, getState) => {
  console.log("cartRemoveItemAction: ", id, color)
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: { id, color }
  })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddressAction = data => async dispatch => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  })
  localStorage.setItem("shippingAddress", JSON.stringify(data))
}

export const savePaymentMethodAction = data => async dispatch => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  })
  localStorage.setItem("paymentMethod", JSON.stringify(data))
}
