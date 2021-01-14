import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

const NotFound = () => {
    return (
        <Container>
            <div className="form-wrapper">
                <Row className="m-0">
                    <Col md={{ span: 6, offset: 3}}>
                        <Card text="white" className="card py-3">
                            <Card.Body className="text-center">
                                <Card.Title>
                                    <h2>404 Page Not Found</h2>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default NotFound
