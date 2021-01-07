import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'

const Navigation = () => {
    const { authUser } = useAuthContext();

    return (
        <Navbar collapseOnSelect expand="lg" variant="light">
            <Link to="/" className="navbar-brand">
                Photo Review 📸
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {
                            authUser 
                            ? (
                                <>
                                    <NavLink to="/albums" className="nav-link">Albums</NavLink>
                                    <NavLink to="/upload" className="nav-link">Upload</NavLink>
                                    <NavLink to="/logout" className="nav-link">Log Out</NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/login" className="nav-link">Log In</NavLink>
                                    <NavLink to="/register" className="nav-link">Sign Up</NavLink>
                                </>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation
