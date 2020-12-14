import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import { Row, Col, Image, Form, Button, Card, ListGroup } from "react-bootstrap"
import { cartAddItemAction, cartRemoveItemAction } from "../actions/cartActions"
import { useEffect } from "react"
import Meta from "../components/Meta"

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split("=")[1]) : 1
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }
    if (productId) {
      dispatch(cartAddItemAction(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = id => {
    dispatch(cartRemoveItemAction(id))
  }

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping")
  }

  return (
    <>
      <Meta title="Shopping Cart | Woolunatics" />
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message>
              {" "}
              Your cart is empty <br /> <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={3}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>€{item.price}</Col>
                    <Col md={2}>
                      <Form.Control as="select" value={item.qty} onChange={e => dispatch(cartAddItemAction(item.product, Number(e.target.value)))}>
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button variant="link" type="button" onClick={() => removeFromCartHandler(item.product)}>
                        <i className="fas fa-trash text-danger"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h4>
                <h6>€{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                  Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartScreen
