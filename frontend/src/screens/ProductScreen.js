import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Col, ListGroup, Row, Card, Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import ImageGallery from "react-image-gallery"
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
  const [colorName, setColorName] = useState("")
  const [colorImages, setColorImages] = useState([])
  const [initialImages, setInitialImages] = useState([])
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  const productCreateReview = useSelector(state => state.productCreateReview)
  const { loading: loadingCreateReview, error: errorCreateReview, success: successCreateReview } = productCreateReview

  useEffect(() => {
    if (successCreateReview) {
      setRating(0)
      setComment("")
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(productDetailsAction(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    if (product.image) {
      let currentImages = imagesForGallery(product.image)
      setInitialImages([...currentImages])
      setColorImages([...currentImages])
    }
  }, [dispatch, match, successCreateReview, product])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}&color=${colorName.replace(/ +/g, "_")}`)
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(productCreateReviewAction(match.params.id, { rating, comment }))
  }

  const showOptions = min => {
    let values = []
    for (let i = min; i <= 2000; i += 50) {
      values.push(i)
    }
    return values
  }

  const imagesForGallery = imageArray => {
    let currentImages = []
    imageArray.map(img => currentImages.push({ original: img, thumbnail: img }))
    return currentImages
  }

  const selectColorHandler = e => {
    setColorName(e.target.value.trim())
    if (e.target.value.trim() !== "") {
      let imgs = product.color.filter(col => col.name === e.target.value)[0].images
      if (imgs.length > 0) {
        let currentImages = imagesForGallery(imgs)
        setColorImages([...currentImages])
      } else {
        setColorImages([...initialImages])
      }
    } else {
      setColorImages([...initialImages])
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <div className="submenu">
            <Link to="/" className="btn btn-light my-3">
              Go Back
            </Link>
            {userInfo && userInfo.isAdmin && (
              <Link to={`/admin/product/${match.params.id}/edit`} className="btn btn-primary my-3 ">
                Edit
              </Link>
            )}
          </div>
          <Row>
            <Col md={12} lg={6}>
              {product.image && <ImageGallery items={colorImages} showPlayButton={false} showIndex={true} thumbnailPosition="left" />}
            </Col>
            <Col md={6} lg={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div>{product.brand}</div>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <a href="#review-section">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                  </a>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>Fibers:</div> {product.fibers}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>Meterage:</div> {product.meterage}m / 100g
                </ListGroup.Item>
                <ListGroup.Item>{product.description && product.description.split("\n").map((p, i) => <p key={i}>{p}</p>)}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6} lg={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>€{product.price} / 100g</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Color</Col>
                      <Col>
                        <Form.Group controlId="color">
                          <Form.Control as="select" className="order-select" value={colorName} onChange={selectColorHandler}>
                            <option key="0" value="">
                              Select...
                            </option>
                            {product.color &&
                              product.color.map(col => (
                                <option key={col.name} value={col.name}>
                                  {col.name}
                                </option>
                              ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {!product.outOfStock && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          {/* <-- select qty */}
                          <Form.Group controlId="qty">
                            <Form.Control as="select" className="order-select" value={qty} onChange={e => setQty(e.target.value)}>
                              <option key="0" value="">
                                Select...
                              </option>
                              {colorName &&
                                Number(product.color.filter(col => col.name.replace(/ +/g, "_") === colorName.replace(/ +/g, "_"))[0].inStock) !== 0 &&
                                product.color
                                  .filter(col => col.name.replace(/ +/g, "_") === colorName.replace(/ +/g, "_"))[0]
                                  .inStock.split(",")
                                  .map((el, i) => (
                                    <option key={i} value={el}>
                                      {el} cone
                                    </option>
                                  ))}

                              {product.minimum &&
                                showOptions(product.minimum).map(el => (
                                  <option key={el} value={el}>
                                    {el}
                                  </option>
                                ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button onClick={addToCartHandler} className="btn-block btn-dark" type="button" disabled={product.outOfStock}>
                      {!product.outOfStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h3 className="my-3" id="review-section">
                Reviews
              </h3>
              {product.reviews.length === 0 && <Message variant="warning">No Reviews for this product</Message>}
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
                  {loadingCreateReview && <Loader />}
                  {successCreateReview && <Message variant="success">Review submitted successfully</Message>}
                  {errorCreateReview && <Message variant="danger">{errorCreateReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <div id="rating">
                          <input type="radio" name="rating" value="5" id="5" onChange={e => setRating(e.target.value)} />
                          <label htmlFor="5">&#9734;</label>
                          <input type="radio" name="rating" value="4" id="4" onChange={e => setRating(e.target.value)} />
                          <label htmlFor="4">&#9734;</label>
                          <input type="radio" name="rating" value="3" id="3" onChange={e => setRating(e.target.value)} />
                          <label htmlFor="3">&#9734;</label>
                          <input type="radio" name="rating" value="2" id="2" onChange={e => setRating(e.target.value)} />
                          <label htmlFor="2">&#9734;</label>
                          <input type="radio" name="rating" value="1" id="1" onChange={e => setRating(e.target.value)} />
                          <label htmlFor="1">&#9734;</label>
                        </div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Control as="textarea" row="5" value={comment} onChange={e => setComment(e.target.value)} placeholder="Write your review here..."></Form.Control>
                      </Form.Group>
                      <Button type="submit" className="btn-block" disabled={loadingCreateReview}>
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
