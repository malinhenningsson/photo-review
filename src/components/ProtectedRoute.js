import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const ProtectedRoute = (props) => {
    const { authUser } = useAuthContext();

    return (
        authUser 
        ? (
            <Route {...props} />
            ) : (
            <Navigate to="/login" />
        )
    )
}

export default ProtectedRoute