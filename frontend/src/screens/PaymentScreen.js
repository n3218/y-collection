import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { savePaymentMethodAction } from "../actions/cartActions"
import CheckoutSteps from "../components/CheckoutSteps"
import Meta from "../components/Meta"

const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart
  if (!shippingAddress) {
    history.push("/shipping")
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal")
  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethodAction(paymentMethod))
    history.push("/placeorder")
  }

  const radioButton = (label, name) => (
    <Form.Check //
      type="radio"
      label={label}
      id={name}
      name="paymentMethod"
      value={name}
      checked={paymentMethod === name}
      onChange={e => setPaymentMethod(e.target.value)}
      className="my-3"
    ></Form.Check>
  )

  console.log(paymentMethod)
  return (
    <FormContainer>
      <Meta title="Payment Method | Woolunatics" />
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Payment Method</Form.Label>

          {radioButton("PayPal or Credit Card", "PayPal")}
          {radioButton("GoolePay", "GoolePay")}
          {radioButton("ApplePay", "ApplePay")}
          {radioButton("Paysend", "Paysend")}
          {radioButton("Stripe", "Stripe")}

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
