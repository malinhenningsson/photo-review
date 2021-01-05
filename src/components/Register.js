import React, { useRef } from 'react'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Register = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const usernameRef = useRef();

	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3}}>
					<Card>
						<Card.Body>
							<Card.Title>Sign Up</Card.Title>

							<Form>
								<Form.Group id="username">
									<Form.Label>Username</Form.Label>
									<Form.Control type="text" ref={usernameRef} required />
								</Form.Group>

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

								<Button type="submit">Sign Up</Button>
							</Form>
						</Card.Body>
					</Card>
					<div className="text-center mt-2">
						<p>Already have an account? <Link to="/login">Log In</Link></p>
					</div>
				</Col>
			</Row>

		</>
	)
}

export default Register