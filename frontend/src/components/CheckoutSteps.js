import React from "react"
import { Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justofy-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="./login">
            <Nav.Link className="text-warning">Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="./shipping">
            <Nav.Link className="text-warning">Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="./payment">
            <Nav.Link className="text-warning">Payment Type</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment Type</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="./placeorder">
            <Nav.Link className="text-warning">Review Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Review Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
