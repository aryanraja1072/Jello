import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import Logo from './Logo'
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';

const NavigationBar = () => {
  return (
    // <AppBar position="static">
    //     <Toolbar>
    //         <IconButton edge="start" color="inherit" aria-label="menu">
    //             <Logo />
    //         </IconButton>
    //         <Typography variant="h6">  
    //             Jello
    //         </Typography>
    //         <div style={{ display: 'block', width: 700, padding: 30}}>
    //   <Nav>
    //     <Nav.Item>
    //       <Nav.Link href="/">Home</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link href="/signin">Sign In</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link href="/signup" >Sign Up</Nav.Link>
    //     </Nav.Item>
    //   </Nav>
    // </div>
    //     </Toolbar>
    // </AppBar>
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/"><Logo/ > Jello</Navbar.Brand>
    <Nav className="me-auto">
      <Link to="/">Home</Link>
      <Link to="/signin">Sign In</Link>
      <Link to="/signup">Sign Up</Link>
    </Nav>
    </Container>
  </Navbar>
  )
}

export default NavigationBar