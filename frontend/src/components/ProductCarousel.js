import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Carousel, Image } from "react-bootstrap"
import Loader from "./Loader"
import Message from "./Message"
import { productTopAction } from "../actions/productActions"

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const productTop = useSelector(state => state.productTop)
  const { loading, error, products } = productTop

  useEffect(() => {
    dispatch(productTopAction())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-light" fade>
      {products.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Image src={product.image} title={product.name} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2 className="text-dark">
                {product.name} €{product.price}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
