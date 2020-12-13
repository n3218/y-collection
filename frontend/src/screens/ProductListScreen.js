import React, { useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listProducts, productCreateAction, productDeleteAction } from "../actions/productActions"
import { PRODUCT_CREATE_RESET } from "../constants/productConstants"
import { Link } from "react-router-dom"
import Paginate from "../components/Paginate"
import Meta from "../components/Meta"

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1

  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const productDelete = useSelector(state => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete
  const productCreate = useSelector(state => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login")
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts("", pageNumber))
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])

  const deleteHandler = id => {
    if (window.confirm("Are you sure?")) {
      dispatch(productDeleteAction(id))
    }
    console.log("deleteHandler")
  }

  const createProductHandler = () => {
    console.log("createProductHandler")
    dispatch(productCreateAction())
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button variant="dark" className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {successDelete && <Message variant="success">Product was deleted</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title="Admin | Product List | Woolunatics" />
          <Paginate isAdmin pages={pages} page={page} />
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>PIC</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>EDIT</th>
                <th>DEL</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td width="50px">
                    <Image src={product.image} alt={product.name} fluid />
                  </td>
                  <td>
                    <Link to={`/products/${product._id}`}>{product.name}</Link>
                  </td>
                  <td>€{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="link" title="Edit">
                        <i className="fas fa-edit text-success"></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <Button variant="link" title="Delete" onClick={() => deleteHandler(product._id)}>
                      <i className="fas fa-trash text-danger"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate isAdmin pages={pages} page={page} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
