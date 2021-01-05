import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const Frontpage = () => {
    const { authUser } = useAuthContext();

    return (
        <div className="frontpage-wrapper">
            <div className="frontpage-content">
                <h1>Review Photos.</h1>
                <h2>Collaboration between photographers and clients made easy.</h2>

                {
                    authUser ? (
                        <Link to="/upload">
                            <Button className="mt-3" variant="light" size="lg">Upload Photos</Button>
                        </Link>
                    ) : (
                        <Link to="/register">
                            <Button className="mt-3" variant="light" size="lg">Join For Free</Button>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default Frontpage
