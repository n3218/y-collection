import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Row, Col, Image, Form, Button, ListGroup } from "react-bootstrap"
import { cartRemoveItemAction, cartUpdateItemAction } from "../actions/cartActions"
import { replaceUploads } from "../constants/commonConstants"

const CartItems = ({ cartItems }) => {
  const dispatch = useDispatch()

  const removeFromCartHandler = (id, color) => {
    dispatch(cartRemoveItemAction(id, color))
  }

  const showOptions = min => {
    let values = []
    for (let i = min; i <= 2000; i += 50) {
      values.push(i)
    }
    return values
  }

  return (
    <ListGroup variant="flush">
      {cartItems.map(item => (
        <ListGroup.Item key={`${item.product}-${item.color}`}>
          <Row>
            <Col xl={2} xs={2}>
              <Image src={replaceUploads(item.image)} alt={item.name} fluid thumbnail />
            </Col>
            <Col>
              <div>
                <small>{item.brand}</small> <Link to={`/products/${item.product}`}>{item.name}</Link>
              </div>
              {item.meterage && <div>{item.meterage}m / 100g</div>}
              {item.fibers && (
                <div>
                  <small>{item.fibers}</small>
                </div>
              )}
              <div>
                <b>Color: </b> {item.color && item.color}
              </div>
              <div>
                <strong>Price: </strong> €{item.price} / 100g
              </div>
            </Col>
            <Col>
              <Row>
                <Col>
                  <div>
                    <strong>Item price: </strong> €{(item.price * item.qty * 0.01).toFixed(2)}
                  </div>
                  <div>
                    <strong>Item meterage: </strong> {item.meterage * item.qty * 0.01}m
                  </div>

                  {!item.minimum ? (
                    <>{item.qty} g</>
                  ) : (
                    <Form.Group controlId="qty">
                      <Form.Control as="select" value={item.qty} onChange={e => dispatch(cartUpdateItemAction(item.product, Number(e.target.value), item.color))}>
                        {showOptions(item.minimum).map(el => (
                          <option key={el} value={el}>
                            {el} g
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  )}
                  <div>
                    <Button variant="link" className="text-danger m-0 p-0" onClick={() => removeFromCartHandler(item.product, item.color)}>
                      <small>delete</small>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default CartItems
