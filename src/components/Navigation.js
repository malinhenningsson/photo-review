import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import CameraLens from '../assets/images/camera-lens.png'

const Navigation = () => {
    const { authUser } = useAuthContext();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src={CameraLens} alt="camera lens icon" style={{ maxHeight: "1.5em", maxWidth: "1.5em", marginRight: "0.25em"}} />
                    Photo Review 
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {
                                authUser 
                                ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/albums" className="nav-link">Albums</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/upload" className="nav-link">Upload</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/logout" className="nav-link">Log Out</NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="nav-link">Log In</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/register" className="nav-link">Sign Up</NavLink>
                                        </li>
                                    </>
                                )
                            }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
