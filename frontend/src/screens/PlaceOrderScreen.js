import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Image, Button, Card, ListGroup } from "react-bootstrap"
import CheckoutSteps from "../components/CheckoutSteps"
import Message from "../components/Message"
import { createOrderAction } from "../actions/orderActions"

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  // Calculate prices
  const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)
  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 26 : 26)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)).toFixed(2)

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrderAction({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      })
    )
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Address:</h2>
              <div>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.zipCode}, {cart.shippingAddress.country}
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method:</h2>
              <div>{cart.paymentMethod}</div>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items:</h2>
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
          </ListGroup>
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
              <ListGroup.Item>{error && <Message>{error}</Message>}</ListGroup.Item>
              <ListGroup.Item>
                <Button //
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order and Pay
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
