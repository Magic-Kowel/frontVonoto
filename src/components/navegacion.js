import React from 'react';
import { 
    Navbar,
    Nav,
    Container
} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
function Navegacion() {
  return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Vonoto</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
 
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <LinkContainer to="/Estancias">
                            <Nav.Link>Estancias</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/Reporte">
                            <Nav.Link>Reporte</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/Veiculos">
                            <Nav.Link>Veiculos</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
}

export default Navegacion;