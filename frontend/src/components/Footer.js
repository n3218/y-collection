import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { appname } from "../constants/commonConstants"

const Footer = () => {
  return (
    <footer className="bg-dark py-5 mt-5 ">
      <Container>
        <Row>
          <Col className="text-center py-5 px-5 my-5 text-light">Copyright &copy; {appname} 2020</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
