import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import { productDetailsAction, productUpdateAction } from "../actions/productActions"
import Loader from "../components/Loader"
import FormField from "../components/FormField"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"

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

  const uploadFileHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)
    setUploading(true)

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }

      const { data } = await axios.post("/api/upload", formData, config)

      setImage(data)
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

  return (
    <>
      <Link to="/admin/productList" className="btn btn-light my-3">
        Back
      </Link>
      <FormContainer>
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
            {/* <FormField value={image} label="Image" onChange={setImage} /> */}
            <FormField value={brand} label="Brand" onChange={setBrand} />
            <FormField value={category} label="Category" onChange={setCategory} />
            <FormField value={description} label="Description" onChange={setDescription} />
            <FormField value={countInStock} label="Count In Stock" onChange={setCountInStock} />

            <Form.Group controlId="image-file">
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" placeholder="Image file" value={image} onChange={e => setImage(e.target.value)}></Form.Control>
              <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler}></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Button type="submit" variant="primary">
              Save
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
