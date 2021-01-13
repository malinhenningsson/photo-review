import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingSpinner = () => {
    return (
        <div>
            <Spinner animation="border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default LoadingSpinner
