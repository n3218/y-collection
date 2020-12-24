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
  const qty = location.search ? Number(location.search.split("=")[1].split("&")[0]) : 1
  const color = location.search ? location.search.split("=")[2] : ""

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
      dispatch(cartAddItemAction(productId, qty, color))
    }
  }, [dispatch, productId, qty, color, history, userInfo])

  const removeFromCartHandler = (id, color) => {
    dispatch(cartRemoveItemAction(id, color))
  }

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping")
  }

  const showOptions = min => {
    let values = []
    for (let i = min; i <= 2000; i += 50) {
      values.push(i)
    }
    return values
  }
  // const changeQtyHandler = e => {
  //   e.preventDefault()
  //   history.push(`/products/${e.target.value}`)
  // }

  console.log("cartItems: ", cartItems)
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
                <ListGroup.Item key={`${item.product}-${item.color}`}>
                  <Row>
                    <Col>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <div>
                        <small>{item.brand}</small>
                      </div>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                      <div>
                        <b>Color: </b> {item.color.replace(/_+/g, " ")}
                      </div>
                      {item.meterage && <div>{item.meterage}m / 100g</div>}
                      <div>{item.fibers}</div>
                    </Col>
                    <Col>€{item.price} / 100g</Col>
                    <Col>
                      {!item.minimum ? (
                        <>{item.qty} g</>
                      ) : (
                        <Form.Group controlId="qty">
                          <Form.Control as="select" value={item.qty} onChange={e => dispatch(cartAddItemAction(item.product, Number(e.target.value), item.color))}>
                            {showOptions(item.minimum).map(el => (
                              <option key={el} value={el}>
                                {el} g
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      )}
                    </Col>
                    <Col>{item.meterage * item.qty * 0.01}m</Col>
                    <Col>€{(item.price * item.qty * 0.01).toFixed(2)}</Col>
                    <Col md={1}>
                      <Button variant="link" type="button" onClick={() => removeFromCartHandler(item.product, item.color)}>
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
                <h4>Subtotal ({cartItems.length}) items</h4>
                <h5>Price: €{cartItems.reduce((acc, item) => acc + item.qty * item.price * 0.01, 0).toFixed(2)}</h5>
                <h5>Weight: {cartItems.reduce((acc, item) => acc + item.qty, 0)}g</h5>
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
