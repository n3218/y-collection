import React, { useState, useEffect } from "react"
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

  const submitHandler = e => {
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
            <FormField value={image} label="Image" onChange={setImage} />
            <FormField value={brand} label="Brand" onChange={setBrand} />
            <FormField value={category} label="Category" onChange={setCategory} />
            <FormField value={description} label="Description" onChange={setDescription} />
            <FormField value={countInStock} label="CountInStock" onChange={setCountInStock} />

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
