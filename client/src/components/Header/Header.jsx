import React from "react";
import ProfileIndicator from '../ProfileIndicator/ProfileIndicator';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
export default function Header() {

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img className="brand" rel="icon" src="https://as2.ftcdn.net/jpg/03/66/82/49/160_F_366824930_gXQbqQIiD1eOO3l5tJXhzeWE1eP2Ewvl.jpg"></img>
          <h3 className="websiteTitle">My pregnancy</h3>
          <p>in every specifics</p>
          <ProtectedRoute allowedRoles={['Admin']}>
            <Link to='/admin'><i><img style={{width:'50px'}} src="https://img.icons8.com/?size=512&id=104252&format=png" alt='Admin'/></i></Link> 
          </ProtectedRoute>
        </Navbar.Brand>
        <Navbar.Toggle className='toggle'aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='link' href="/">Home</Nav.Link>
            <Nav.Link className='link' href="/posts">Posts</Nav.Link>
            <Nav.Link className='link' href="/sports">sports</Nav.Link>
            <Nav.Link className='link' href="/weeks">pregnancy's weeks</Nav.Link>
          </Nav>
          <Nav>
            <ul className="nav navbar-nav navbar-right">
              <li><Nav.Link href="#"><ProfileIndicator/></Nav.Link></li>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
