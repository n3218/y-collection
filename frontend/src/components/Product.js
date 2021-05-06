import React, { useState } from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { replaceUploads, noimage } from "../constants/commonConstants"
import Rating from "./Rating/Rating"

const Product = ({ product }) => {
  const [imgSrc, setImgSrc] = useState(replaceUploads(noimage))

  const getImageOrFallback = (path, fallback) => {
    return new Promise(resolve => {
      const img = new Image()
      img.src = path
      img.onload = () => resolve(setImgSrc(path))
      img.onerror = () => resolve(setImgSrc(fallback))
    })
  }

  const image = replaceUploads(product.image[0])
  getImageOrFallback(image, replaceUploads(noimage)).then(result => result)

  return (
    <Card className="product-card">
      <div className="img-card-container">
        <Link to={`/products/${product._id}`}>
          <Card.Img src={imgSrc} variant="top" alt={product.name} className="img-card" />
        </Link>
      </div>
      <Card.Body className="text-center">
        <Card.Title as="div">
          {product.brand && <small>{product.brand} </small>}
          <div>
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </div>
        </Card.Title>
        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>

        <Card.Text className="my-0">€{product.price} / 100g</Card.Text>
        {product.color.length > 1 && <Card.Text className="my-0 text-danger">{product.color.length} colors</Card.Text>}
      </Card.Body>
    </Card>
  )
}

export default Product
