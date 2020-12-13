import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Col, ListGroup, Row, Image, Card, Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "../components/Rating"
import { productDetailsAction, productCreateReviewAction } from "../actions/productActions"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants"
import "../assets/rating.css"
import Meta from "../components/Meta"

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productCreateReview = useSelector(state => state.productCreateReview)
  const { error: errorCreateReview, success: successCreateReview } = productCreateReview

  useEffect(() => {
    if (successCreateReview) {
      console.log("successCreateReview")
      setRating(0)
      setComment("")
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(productDetailsAction(match.params.id))
  }, [dispatch, match, successCreateReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = e => {
    e.preventDefault()
    console.log("submitHandler")
    dispatch(productCreateReviewAction(match.params.id, { rating, comment }))
  }

  // const radio = ({}) => (
  //   <Form.Check //
  //     type="radio"
  //     label={label}
  //     id={name}
  //     name="paymentMethod"
  //     value={name}
  //     checked={paymentMethod === name}
  //     onChange={e => setRating(e.target.value)}
  //     className="my-3"
  //   ></Form.Check>
  // )

  console.log(product)
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>Price: €{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>€{product.price}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>In Stock:</Col>
                      <Col>{product.countInStock > 0 ? product.countInStock : "Out of Stock"}</Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control as="select" value={qty} onChange={e => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button onClick={addToCartHandler} className="btn-block btn-dark" type="button" disabled={product.countInStock === 0}>
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h3 className="my-3">Reviews</h3>
              {product.reviews.length === 0 && <Message>No Reviews for this product</Message>}
              <ListGroup variant="flush">
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup>
                <ListGroup.Item>
                  <h3>Write a customer Review</h3>
                  {errorCreateReview && <Message variant="danger">{errorCreateReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        {/* <Form.Label as="legend">Rate this product</Form.Label> */}
                        <div id="rating">
                          <input type="radio" name="rating" value="5" id="5" onChange={e => setRating(e.target.value)} />
                          <label for="5">&#9734;</label>
                          <input type="radio" name="rating" value="4" id="4" onChange={e => setRating(e.target.value)} />
                          <label for="4">&#9734;</label>
                          <input type="radio" name="rating" value="3" id="3" onChange={e => setRating(e.target.value)} />
                          <label for="3">&#9734;</label>
                          <input type="radio" name="rating" value="2" id="2" onChange={e => setRating(e.target.value)} />
                          <label for="2">&#9734;</label>
                          <input type="radio" name="rating" value="1" id="1" onChange={e => setRating(e.target.value)} />
                          <label for="1">&#9734;</label>
                        </div>

                        {/* {radioButton("GoolePay", "GoolePay")} */}

                        {/* <Form.Control as="select" value={rating} onChange={e => setRating(e.target.value)}>

                        </Form.Control> */}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" row="5" value={comment} onChange={e => setComment(e.target.value)}></Form.Control>
                      </Form.Group>
                      <Button type="submit" className="btn-block">
                        Submit a review
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="light">
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
