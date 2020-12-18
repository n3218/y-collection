import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"

const Product = ({ product }) => {
  return (
    <Card className="product-card">
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image[0]} variant="top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title as="div">
            {product.brand}, {product.name}
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h5">€{product.price} / 100g</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
