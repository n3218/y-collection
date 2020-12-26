import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"

const Product = ({ product }) => {
  return (
    <Card className="product-card">
      <div className="img-card-container">
        <Link to={`/products/${product._id}`}>
          {product.image.length === 0 ? ( //
            <Card.Img src="/assets/mono-logo.webp" variant="top" alt={product.name} className="img-card image-example" />
          ) : (
            <Card.Img src={product.image[0]} variant="top" alt={product.name} className="img-card" />
          )}
        </Link>
      </div>
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
