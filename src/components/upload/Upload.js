import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Card, Alert, Container } from 'react-bootstrap'
import { useAuthContext } from '../../contexts/AuthContext'
import { db } from '../../firebase'

const Upload = () => {
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');

    const { authUser } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.length < 3) {
            return;
        }

        setError(false);
        setLoading(true);

        try {
            const docRef = await db.collection('albums').add({
                title,
                description,
                owner: authUser.uid
            })
            navigate(`/albums/${docRef.id}`)
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    return (
        <>
            <header>
                <h1 className="text-center">Create a new album</h1>
            </header>

            <Container className="px-4 mt-4 mb-5">
                <Card text="white" className="form-box">
                    <Card.Body>
                        <Form onSubmit={handleSubmit} role="form">
                            <Form.Group id="title" className="mb-3">
                                <Form.Label>Album title</Form.Label>
                                <Form.Control 
                                    type="title" 
                                    onChange={(e) => {setTitle(e.target.value)}} 
                                    value={title} 
                                    minLength={3}
                                    required 
                                    />
                                    <Form.Text muted>
                                        Please enter a title at least 3 chars long.
                                    </Form.Text> 
                            </Form.Group>

                            <Form.Group id="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    onChange={(e) => {setDescription(e.target.value)}}
                                    maxLength={100}
                                    value={description}
                                    />
                                <Form.Text muted>
                                    Description can be max 100 chars long.
                                </Form.Text>
                            </Form.Group>

                            <button className="btn btn-standard mt-3" disabled={loading} type="submit">Create</button>
                        </Form>
                    </Card.Body>
                </Card>
                {
                    error && (
                        <Alert variant="danger">{error}</Alert>)
                }
            </Container>
        </>
    )
}

export default Upload
