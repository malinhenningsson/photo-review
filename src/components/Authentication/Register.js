import React, { useRef, useState } from 'react'
import { Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

const Register = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const { register } = useAuthContext();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			setError("The password does not match, please try again!")
			return;
		}

		setError(null);

		try {
			setLoading(true);
			// Register new user with firebase authentication
			console.log('Sign up user: ', emailRef.current.value, passwordRef.current.value);
			await register(emailRef.current.value, passwordRef.current.value);
			
			navigate('/');
		} catch (err) {
			setError(e.message);
			setLoading(false);
		}
	}

	return (
		<div className="form-wrapper">
			<Row className="m-0">
				<Col md={{ span: 6, offset: 3}}>
					<Card bg="dark" text="white">
						<Card.Body>
							<Card.Title className="text-center">Sign Up</Card.Title>

							<Form onSubmit={handleSubmit}>
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

								<Button variant="light" type="submit" className="mt-3" disabled={loading}>Sign Up</Button>
							</Form>
							{
								error && (
									<Alert variant="danger" className="mt-3">{error}</Alert>
								)
							}
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