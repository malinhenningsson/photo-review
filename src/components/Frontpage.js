import React from 'react'
import { Button, Container, Jumbotron } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const Frontpage = () => {
    const { authUser } = useAuthContext();

    return (
        <Jumbotron fluid>
            <Container>
                <div className="frontpage-content">
                    <h1 className="display-3">Review Photos.</h1>
                    <p className="display-6">Collaboration between photographers and clients made easy.</p>

                    {
                        authUser ? (
                            <Link to="/upload">
                                <Button className="mt-3 btn-standard" size="lg">Start Creating</Button>
                            </Link>
                        ) : (
                            <Link to="/register">
                                <Button className="mt-3 btn-standard" size="lg">Join For Free</Button>
                            </Link>
                        )
                    }
                </div>
            </Container>
        </Jumbotron>
    )
}

export default Frontpage
