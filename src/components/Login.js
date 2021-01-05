import React, { useRef, useState } from 'react'
import { Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const { login } = useAuthContext();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			
			navigate('/');
		} catch (err) {
			setError("Could not log in. Please try again.");
			setLoading(false);
		}
	}

	return (
		<div className="form-wrapper">
			<Row className="m-0">
				<Col md={{ span: 6, offset: 3}}>
					<Card bg="dark" text="white">
						<Card.Body>
							<Card.Title className="text-center">Log In</Card.Title>

							<Form onSubmit={handleSubmit}>
								<Form.Group id="email">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} required />
								</Form.Group>

								<Form.Group id="password">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" ref={passwordRef} required />
								</Form.Group>

								<Button variant="light" type="submit" className="mt-3" disabled={loading}>Log In</Button>
							</Form>
							{
								error && (
									<Alert variant="danger" className="mt-3">{error}</Alert>
								)
							}
						</Card.Body>
					</Card>
					<div className="text-center mt-2">
						<p>Don't have an account? <Link to="/register">Sign Up!</Link></p>
					</div>
				</Col>
			</Row>

		</div>
	)
}

export default Login