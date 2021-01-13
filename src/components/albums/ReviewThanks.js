import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Container } from 'react-bootstrap'

const ReviewThanks = () => {
    return (
        <Container>
		<div className="form-wrapper">
			<Row className="m-0">
				<Col md={{ span: 6, offset: 3}}>
					<Card text="white" className="card py-3">
						<Card.Body className="text-center">
							<Card.Title>
								<h2>Thanks for your photo review!</h2>
							</Card.Title>
                                <Card.Text>
                                        If you like this service, please tell your friends. <br/> 
                                        Or why not start your own account? <br/>
                                        <Link to="/register">Sign Up!</Link>
                                </Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
		</Container>
    )
}

export default ReviewThanks
