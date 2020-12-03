import React from "react"
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from "react-bootstrap"
// import { ReactComponent as Logo } from "../assets/wool.svg"
import { LinkContainer } from "react-router-bootstrap"

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img className="logo" alt="Logo" src="/assets/wool.svg" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/how-to">
                <Nav.Link>How to Order</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Catalog" id="basic-nav-dropdown">
                <LinkContainer to="/cashmere">
                  <NavDropdown.Item>Cachmere</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/mohair">
                  <NavDropdown.Item>Mohair</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/cotton">
                  <NavDropdown.Item>Cotton</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/all">
                  <NavDropdown.Item>All</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="warning">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
