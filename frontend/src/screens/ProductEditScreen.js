import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { FormFieldAsRow, FormFieldAsRowCheckbox } from "../components/FormField"
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
  const [outOfStock, setOutOfStock] = useState(false)
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
  const [meterage, setMeterage] = useState(0)
  const [minimum, setMinimum] = useState(0)
  const [color, setColor] = useState(defaultColor)
  const [colors, setColors] = useState({})

  const [colorName, setColorName] = useState("")
  const [colorInStock, setColorInStock] = useState("")
  const [colorImage, setColorImage] = useState([])

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  const [colorMap, setColorMap] = useState({})

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
        setOutOfStock(product.outOfStock)
        setFibers(product.fibers)
        setMeterage(product.meterage)
        setMinimum(product.minimum)
        setColor(product.color)

        let copyColorMap = { ...colorMap }
        color.map(col => (copyColorMap[col.name] = { ...col }))
        setColorMap({ ...copyColorMap })
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
        outOfStock,
        fibers,
        meterage,
        minimum,
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

  const onChangeColorHandler = () => {
    let copy = color
  }

  console.log("color: ", color)
  console.log("colorMap: ", colorMap)

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

  return (
    <>
      <Meta title="Admin | Edit Product | Woolunatics" />
      <div className="submenu">
        <Link to="/admin/productList" className="btn btn-light my-3 text-left">
          Back
        </Link>
        <Link to={`/products/${productId}`} className="btn btn-light my-3 text-right">
          Preview
        </Link>
      </div>

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
              <FormFieldAsRow value={minimum} label="Minimum" onChange={setMinimum} />
              <FormFieldAsRowCheckbox value={outOfStock} label="Out Of Stock" onChange={setOutOfStock} />

              <Form.Group controlId="inStock">
                <Form.Label>Colors:</Form.Label>

                {color &&
                  color.map((col, i) => (
                    <div key={i}>
                      <input type="text" value={color[i].name} placeholder="Color" onChange={e => setColor({ ...color, [color[i].name]: e.target.value })} />
                      <input type="text" value={col.inStock} placeholder="inStock" onChange={e => setColorInStock(e.target.value)} />

                      {/* <div className="btn btn-primary mx-2 btn-sm" onClick={e => console.log("changingColor")}>
                            Change Color
                          </div> */}
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
