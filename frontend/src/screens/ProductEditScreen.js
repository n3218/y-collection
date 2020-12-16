import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormField from "../components/FormField"
import { productDetailsAction, productUpdateAction } from "../actions/productActions"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"
import Meta from "../components/Meta"

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [color, setColor] = useState(false)
  const [weight, setWeight] = useState(false)

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push("/admin/productlist")
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(productDetailsAction(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setDescription(product.description)
        setCountInStock(product.countInStock)
      }
    }
  }, [product, dispatch, productId, history, successUpdate])

  //
  //
  const uploadFileHandler = async e => {
    const file = e.target.files
    const formData = new FormData()
    for (let i in file) {
      if (typeof file[i] === "object") {
        formData.append("image", file[i])
      }
    }

    setUploading(true)
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      const { data } = await axios.post("/api/upload", formData, config)
      console.log("data: ", data)
      setImage([...image, ...data.map(img => `/${img.path}`)])
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = e => {
    console.log("submitHandler")
    e.preventDefault()
    dispatch(
      productUpdateAction({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock
      })
    )
  }
  const addColorWeight = () => {
    console.log("addColorWeight")
  }
  console.log(image)

  return (
    <>
      <Meta title="Admin | Edit Product | Woolunatics" />
      <Row>
        <Col md={4}>
          <Link to="/admin/productList" className="btn btn-light my-3">
            Back
          </Link>
          {image &&
            image.map(i => (
              <div key={i}>
                {i}:
                <Image src={i} alt={name} fluid />
              </div>
            ))}
        </Col>
        <Col>
          <h1>Edit Product</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <FormField value={name} label="Name" onChange={setName} />
              <FormField value={price} label="Price" onChange={setPrice} />
              <FormField value={brand} label="Brand" onChange={setBrand} />
              <FormField value={category} label="Category" onChange={setCategory} />
              <FormField value={description} label="Description" onChange={setDescription} />

              <FormField value={countInStock} label="Count In Stock" onChange={setCountInStock} />

              <Form.Group controlId="color-weight">
                <Form.Label>Color</Form.Label>
                <input type="text" placeholder="Color" />
                <input type="text" placeholder="Weight" />
                <button onClick={addColorWeight}>Add</button>
                {/* <FormField value={color} label="Color" onChange={setColor} /> */}
              </Form.Group>

              <Form.Group controlId="image-file">
                <Form.Label>Image</Form.Label>
                <div>{image && image.map(i => <div key={i}>{i}</div>)}</div>
                <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler} multiple accept="image/png, image/jpeg, image/jpg"></Form.File>
                {uploading && <Loader />}
              </Form.Group>

              <Button type="submit" variant="primary">
                Save
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProductEditScreen
