import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Row, Col, Listgroup, Image, Form, Button, Card, ListGroup } from "react-bootstrap"
import CheckoutSteps from "../components/CheckoutSteps"
import Message from "../components/Message"

const PlaceOrderScreen = () => {
  const cart = useSelector(state => state.cart)
  console.log(cart.cartItems)

  // Calculate prices
  const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)
  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)

  const placeOrderHandler = () => {
    console.log("placeOrderHandler")
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>Review Order</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Shipping Address:</h4>
              <div>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.zipCode}, {cart.shippingAddress.country}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Payment Method:</h4>
              <div>{cart.paymentMethod}</div>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <h4>Order Items:</h4>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty.</Message>
            ) : (
              <ListGroup variant="flush">
                {cart.cartItems.map((item, i) => (
                  <ListGroup.Item key={i}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h5>Total</h5>
                  </Col>
                  <Col>
                    <h5>${cart.totalPrice}</h5>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button //
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
