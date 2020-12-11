import React, { useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router-dom"
import { Table, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listOrdersAction } from "../actions/orderActions"

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector(state => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login")
    } else {
      dispatch(listOrdersAction())
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>Orders</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>FROM DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>USER</th>
              <th>ADDRESS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>
                  <Link to={`/orders/${order._id}`}>{order._id}</Link>
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>€{order.totalPrice}</td>
                <td>{order.isPaid ? <span className="text-success">{order.paidAt.substring(0, 10)}</span> : <i className="fas fa-times text-danger"></i>}</td>
                <td>{order.isDelivered ? <span className="text-success">{order.deliveredAt.substring(0, 10)}</span> : <i className="fas fa-times text-danger"></i>}</td>

                <td>{order.user && order.user.name}</td>
                <td>
                  {order.shippingAddress.city}, {order.shippingAddress.country}
                </td>
                <td>
                  <LinkContainer to={`/admin/order/${order._id}/edit`}>
                    <Button variant="link" title="Edit">
                      <i className="fas fa-edit text-success"></i>
                    </Button>
                  </LinkContainer>
                </td>
                {/* <td>
                  <Button variant="link" title="Delete" onClick={() => deleteHandler(order._id)}>
                    <i className="fas fa-trash text-danger"></i>
                  </Button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen