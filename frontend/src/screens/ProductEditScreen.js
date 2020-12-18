import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { FormFieldAsRow } from "../components/FormField"
import { productDetailsAction, productUpdateAction } from "../actions/productActions"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"
import Meta from "../components/Meta"
import ImageLarge from "../components/ImageLarge"
import ImageUpload from "../components/ImageUpload"

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

  const [showColorPictureBlock, setShowColorPictureBlock] = useState(false)
  const [checkedPictures, setCheckedPictures] = useState([])

  const defaultColor = [
    {
      name: "",
      inStock: "",
      images: []
    }
  ]
  const [fibers, setFibers] = useState("")
  const [meterage, setMeterage] = useState(100)
  const [color, setColor] = useState(defaultColor)
  const [colorName, setColorName] = useState("")
  const [colorInStock, setColorInStock] = useState("")

  const [colorImage, setColorImage] = useState([])

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
        setFibers(product.fibers)
        setMeterage(product.meterage)
        setColor(product.color)
      }
    }
  }, [product, dispatch, productId, history, successUpdate])

  const submitHandler = e => {
    console.log("submitHandler")
    console.log("submitHandler:color: ", color)
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
        countInStock,
        fibers,
        meterage,
        color
      })
    )
  }

  const addColorHandler = e => {
    e.preventDefault()
    console.log("addColorHandler")
    setColor([
      ...color,
      {
        name: colorName,
        image: [...colorImage],
        inStock: colorInStock
      }
    ])
    setColorName("")
    setColorInStock("")
  }

  const setCheckedPicturesHandler = e => {
    e.preventDefault()
    setCheckedPictures([...checkedPictures, e.target.value])
    e.target.checked = true
  }

  console.log("color: ", color)

  const colorPictureBlock = () => {
    return (
      <div className="color-picture-block">
        {image &&
          image.map(i => (
            <div key={i} className="color-picture">
              <Form.Label>
                <img src={i} width="80" />
              </Form.Label>
              <Form.Check type="checkbox" value={i} checked={checkedPictures.includes(i)} onChange={setCheckedPicturesHandler}></Form.Check>
              {console.log(checkedPictures.includes(i))}
            </div>
          ))}
        <div className="btn btn-primary">Link</div>
      </div>
    )
  }

  console.log("showColorPictureBlock: ", showColorPictureBlock)

  return (
    <>
      <Link to="/admin/productList" className="btn btn-light my-3">
        Back
      </Link>
      <Meta title="Admin | Edit Product | Woolunatics" />
      <Row>
        <Col md={4}>
          <ImageLarge image={image} name={`${brand} ${name}`} />
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
              <FormFieldAsRow value={name} label="Name" onChange={setName} />
              <FormFieldAsRow value={brand} label="Brand" onChange={setBrand} />
              <FormFieldAsRow value={category} label="Category" onChange={setCategory} />
              <FormFieldAsRow value={fibers} label="Fibers" onChange={setFibers} />
              <FormFieldAsRow value={meterage} label="Meterage" onChange={setMeterage} />
              <FormFieldAsRow as="textarea" rows={5} value={description} label="Description" onChange={setDescription} />
              <FormFieldAsRow value={price} label="Price" onChange={setPrice} />
              <FormFieldAsRow value={countInStock} label="In Stock" onChange={setCountInStock} />

              {/* COLOR */}
              <Form.Group controlId="inStock">
                <Form.Label>Colors:</Form.Label>
                {color &&
                  color.map((item, i) => (
                    <div key={i}>
                      <strong>{item.name}</strong>: {item.inStock}
                      <div className="btn btn-primary mx-2 btn-sm" onClick={e => console.log("changingColor")}>
                        Change Color
                      </div>
                      <div className="btn btn-primary mx-2 my-2 btn-sm" onClick={() => setShowColorPictureBlock(!showColorPictureBlock)}>
                        Link Picture
                      </div>
                    </div>
                  ))}
                {showColorPictureBlock && colorPictureBlock()}
                <hr />
                <input type="text" value={colorName} placeholder="Color" onChange={e => setColorName(e.target.value)} />
                <input type="text" value={colorInStock} placeholder="inStock" onChange={e => setColorInStock(e.target.value)} />
                <button onClick={addColorHandler}>Add Color</button>
                <hr />
              </Form.Group>

              <ImageUpload image={image} setUploading={setUploading} setImage={setImage} uploading={uploading} />

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
