import React, { useState } from "react"
import { Form, Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { savePaymentMethodAction } from "../actions/cartActions"
import CheckoutSteps from "../components/CheckoutSteps"

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
    console.log("PaymentScreen:submitHandler")
    dispatch(savePaymentMethodAction(paymentMethod))
    history.push("/placeorder")
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Payment Method</Form.Label>
        </Form.Group>

        <Col>
          <Form.Check //
            type="radio"
            label="PayPal or Credit Card"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={e => setPaymentMethod(e.target.value)}
          ></Form.Check>
          <Form.Check //
            type="radio"
            label="Stripe"
            id="Stripe"
            name="paymentMethod"
            value="Stripe"
            onChange={e => setPaymentMethod(e.target.value)}
          ></Form.Check>
          <Form.Check //
            type="radio"
            label="Paysend"
            id="Paysend"
            name="paymentMethod"
            value="Paysend"
            onChange={e => setPaymentMethod(e.target.value)}
          ></Form.Check>
          <Form.Check //
            type="radio"
            label="GoolePay"
            id="GoolePay"
            name="paymentMethod"
            value="GoolePay"
            onChange={e => setPaymentMethod(e.target.value)}
          ></Form.Check>
          <Form.Check //
            type="radio"
            label="ApplePay"
            id="ApplePay"
            name="paymentMethod"
            value="ApplePay"
            onChange={e => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
