import React, { useRef, useState } from 'react'
import { Row, Col, Form, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

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
			
			navigate('/albums');
		} catch (err) {
			setError("Could not log in. Please try again.");
			setLoading(false);
		}
	}

	return (
		<div className="form-wrapper">
			<Row className="m-0">
				<Col md={{ span: 6, offset: 3}}>
					<Card text="white" className="form-box">
						<Card.Body>
							<Card.Title className="text-center">
								<h2>Log In</h2>
							</Card.Title>

							<Form onSubmit={handleSubmit}>
								<Form.Group id="email">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} required />
								</Form.Group>

								<Form.Group id="password">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" ref={passwordRef} required />
								</Form.Group>

								<button type="submit" className="btn mt-3 btn-standard" disabled={loading}>Log In</button>
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