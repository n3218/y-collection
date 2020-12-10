import React from "react"
import { Form } from "react-bootstrap"

const FormField = ({ value, label, onChange }) => {
  return (
    <Form.Group controlId={value}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type="text" placeholder={`Enter {label}`} value={value} onChange={e => onChange(e.target.value)}></Form.Control>
    </Form.Group>
  )
}

export default FormField
