import React, { useRef } from 'react'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Register = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const usernameRef = useRef();

	return (
		<div className="form-wrapper">
			<Row className="m-0">
				<Col md={{ span: 6, offset: 3}}>
					<Card bg="dark" text="white">
						<Card.Body>
							<Card.Title className="text-center">Sign Up</Card.Title>

							<Form>
								<Form.Group id="email">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} required />
								</Form.Group>

								<Form.Group id="password">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" ref={passwordRef} required />
								</Form.Group>

								<Form.Group id="password-confirm">
									<Form.Label>Password confirmation</Form.Label>
									<Form.Control type="password" ref={passwordConfirmRef} required />
								</Form.Group>

								<Button variant="light" type="submit" className="mt-3">Sign Up</Button>
							</Form>
						</Card.Body>
					</Card>
					<div className="text-center mt-2">
						<p>Already have an account? <Link to="/login">Log In</Link></p>
					</div>
				</Col>
			</Row>

		</div>
	)
}

export default Register