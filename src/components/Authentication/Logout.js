import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

const Logout = () => {
    const { logout } = useAuthContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        (async (e) => {
            await logout();
            navigate('/')
        })();
    }, []);
    
    return (
        <div className="text-center mt-4">
            <p>You are logging out... </p>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Logout