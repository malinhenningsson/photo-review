import React, { useRef, useState } from 'react'
import { Row, Col, Form, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

const ForgotPassword = () => {
    const emailRef = useRef();
	const [btnDisabled, setBtnDisabled] = useState(false);
	const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    
	const { forgotPassword } = useAuthContext();
    
    const handleSubmit = async (e) => {
		e.preventDefault();

		setError(null);
        setMessage(null);
		try {
			setBtnDisabled(true);
			await forgotPassword(emailRef.current.value);
			setMessage("Further instructions has been sent to your email adress.")
		} catch (e) {
			setError("Something went wrong. Please check your email address.")
            setBtnDisabled(false);
            setMessage(null);
		}
	}
    return (
        <div className="form-wrapper">
            <Row>
                <Col md={{ span: 6, offset: 3}}>
                    <Card text="white" className="form-box">
                        <Card.Body>
                            <Card.Title className="text-center">Forgot Password?</Card.Title>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>

                                <button type="submit" className="btn mt-3 btn-standard" disabled={btnDisabled}>Reset Password</button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="text-center mt-3 mb-3">
                        <p className="mb-1">Remember your password? <Link to="/login">Log In</Link></p>
                    </div>
                    { 
                        error && (
                            <Alert variant="danger" className="text-center">{error}</Alert>
                        )
                    }
                    {
                        message && (
                            <Alert variant="light" className="text-center">{message}</Alert>
                        )
                    }
                </Col>
            </Row>
     </div>
    )
}

export default ForgotPassword