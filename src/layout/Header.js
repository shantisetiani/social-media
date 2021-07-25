import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MENU } from "../config";
import { LoginContext } from "../App";

function Header() {
  const loginContext = useContext(LoginContext);
  const history = useHistory();

  const logout = () => {
    loginContext.logout();
    history.push(MENU.HOME);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="">Kumparan SocMed</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={MENU.HOME}>Home</Nav.Link>
            <Nav.Link href={MENU.PEOPLE}>People</Nav.Link>
            <Nav.Link href={MENU.POST}>Post</Nav.Link>
          </Nav>
          <Nav>
            {loginContext.isLogin ? (
              <NavDropdown
                title={loginContext.loginInfo.name}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link to={`people/${loginContext.loginInfo.id}/profile`}>
                    My Profile
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link onClick={() => loginContext.login()}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
