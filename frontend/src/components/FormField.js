import React from "react"
import { Form, Row, Col } from "react-bootstrap"

const FormField = ({ value, label, onChange }) => {
  return (
    <Form.Group controlId={value}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type="text" placeholder={`Enter ${label}`} value={value} onChange={e => onChange(e.target.value)}></Form.Control>
    </Form.Group>
  )
}

export const FormFieldAsRow = ({ value, label, onChange, as, rows }) => {
  return (
    <Form.Group controlId={value}>
      <Row>
        <Col sm="2">
          <Form.Label>{label}</Form.Label>
        </Col>
        <Col>
          <Form.Control as={as} rows={rows} column sm="10" type="text" placeholder={`Enter ${label}`} value={value} onChange={e => onChange(e.target.value)}></Form.Control>
        </Col>
      </Row>
    </Form.Group>
  )
}

export default FormField
