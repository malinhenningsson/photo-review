import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Link to="/" className="navbar-brand">
                Photo Review 📸
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink to="/login" className="nav-link">Log In</NavLink>
                        <NavLink to="/register" className="nav-link">Sign Up</NavLink>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation
