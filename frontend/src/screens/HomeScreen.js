import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listProducts } from "../actions/productActions"
import Paginate from "../components/Paginate"
// import ProductCarousel from "../components/ProductCarousel"
import Promo from "../components/Promo"
import Meta from "../components/Meta"

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <div>
      {/* {!keyword && <ProductCarousel />} */}
      {!keyword && <Promo />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta />
          <Row>
            {products &&
              products.map(product => (
                <Col key={product._id} sm={6} md={3} lg={2} className="product-card-block">
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </>
      )}
    </div>
  )
}

export default HomeScreen
