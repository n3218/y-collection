import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="form-container ">
        <Col xs={8} xl={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
