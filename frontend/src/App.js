import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import Footer from "./components/Footer"
import Header from "./components/Header"
import HomeScreen from "./screens/HomeScreen"
import AboutScreen from "./screens/AboutScreen"
import HowToScreen from "./screens/HowToScreen"
import ProductScreen from "./screens/ProductScreen"
import Switch from "react-bootstrap/esm/Switch"
import CartScreen from "./screens/ CartScreen"

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/about" component={AboutScreen} />
            <Route path="/how-to" component={HowToScreen} />
            <Route path="/products/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
