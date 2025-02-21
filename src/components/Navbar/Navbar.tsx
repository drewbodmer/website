import React from "react";
import "./navbar-styles.css";

import {
  Container,
  Nav,
  Navbar,
  // NavDropdown,
} from "react-bootstrap";

interface NavTab {
  changeTab: Function;
}


export function NavbarComponent({ changeTab }: NavTab): JSX.Element {
  // const token = React.useContext(TokenContext);
  // const token = localStorage.getItem('token');

  // function displayLoginOptions() {
  //   if (token !== "" && token !== undefined && token !== null) {
  //     return (
  //       <>
  //         <Nav.Link className="navbar-link" href="" eventKey="search_tracking_upload">
  //           Search Tracking Upload
  //         </Nav.Link>
  //         <Nav.Link className="navbar-link" href="" eventKey="logout">
  //           Logout
  //         </Nav.Link>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <Nav.Link href="" eventKey="search_tracking">
  //           Search Tracking
  //         </Nav.Link>
  //         <Nav.Link className="navbar-link" href="" eventKey="login">
  //           Login
  //         </Nav.Link>
  //       </>
  //     );
  //   }
  // }
  const [_, setTab] = React.useState("");
  const handleNav = (eventKey: any) => {
    setTab(eventKey);
    changeTab(eventKey);
  };

  return (
    <>
      <Navbar className="navbar navbar-expand-lg transparent-element" expand="sm" onSelect={handleNav}>
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="navbar-nav">
              <Nav.Link className="navbar-link" href="" eventKey="">
                Home
              </Nav.Link>
              <Nav.Link className="navbar-link" href="" eventKey="about">
               About 
              </Nav.Link>
              <Nav.Link className="navbar-link" href="" eventKey="blog">
                Blog
              </Nav.Link>
              {/* <NavDropdown className="navbar-link" title="Projects" id="navbarScrollingDropdown">
                <NavDropdown.Item href="" eventKey="searchTracking">
                  Search Tracking
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="" eventKey="dcgan">
                  DCGAN
                </NavDropdown.Item>
              </NavDropdown> */}
              <Nav.Link className="navbar-link" href="" eventKey="csresume">
                Resume
              </Nav.Link>
              {/* <NavDropdown className="navbar-link" title="Resume" id="navbarScrollingDropdown">
                <NavDropdown.Item href="" eventKey="csresume">
                  Software Engineering
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="" eventKey="dsresume">
                  Data Science
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
