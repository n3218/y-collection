import React from "react"
import { Link, Route } from "react-router-dom"
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { logout } from "../actions/userActions"
import SearchBox from "./SearchBox"

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="white" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img className="logo" alt="Logo" src="/assets/wool.svg" />
            </Navbar.Brand>
          </LinkContainer>

          <Link to="/" className="text-decoration-none">
            <h1 className="text-dark">Woolunatics</h1>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/how-to">
                <Nav.Link>How to Order</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Catalogue" id="basic-nav-dropdown">
                <LinkContainer to="/search/cashmere|кашемир">
                  <NavDropdown.Item>Cachmere</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/merino|меринос">
                  <NavDropdown.Item>Merino</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/camel|верблюд">
                  <NavDropdown.Item>Camel</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/mohair|мохер">
                  <NavDropdown.Item>Mohair</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/silk|шелк">
                  <NavDropdown.Item>Silk</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/angora|ангора">
                  <NavDropdown.Item>Angora</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/alpaca|альпака">
                  <NavDropdown.Item>Alpaca</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/linen|linnen|_лен">
                  <NavDropdown.Item>Linen</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/Пайетки|пайетки">
                  <NavDropdown.Item>Paillettes</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/all">
                  <NavDropdown.Item>All</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to="/cart" className="text-nowrap">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart ({cartItems && cartItems.length})
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              <Route render={({ history }) => <SearchBox history={history} />} />

              {/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button>Search</Button>
              </Form>  */}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={"Admin"} id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
