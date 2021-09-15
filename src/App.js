import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Container, Navbar, Nav } from 'react-bootstrap'
import OrderList from './components/order-list.component'
// import OrderDetail from './components/order-detail.component'
import './assets/scss/App.scss'


export default function App() {
  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Simple Order Apps</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Orders</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="mt-5">
          <Container>
            <Switch>
              <Route path="/">
                <OrderList />
              </Route>
            </Switch>
          </Container>
        </div>
      </div>
    </Router>
  )
}
