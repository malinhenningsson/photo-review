import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Alert, Container } from 'react-bootstrap'
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
        <Container>
            <h1 className="text-center">Create a new album</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group id="title">
                    <Form.Label>Album title</Form.Label>
                    <Form.Control 
                        type="title" 
                        onChange={(e) => {setTitle(e.target.value)}} 
                        value={title} 
                        required 
                        />
                            {
                                title && title.length < 3 && (
                                    <Form.Text className="text-danger">
                                        Please enter a title at least 3 characters long.
                                    </Form.Text> )
                            }
                </Form.Group>

                <Form.Group id="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        type="text" 
                        onChange={(e) => {setDescription(e.target.value)}} 
                        value={description}
                        />
                </Form.Group>

                <Button variant="dark" disabled={loading} type="submit">Create</Button>
            </Form>
            {
                error && (
                    <Alert variant="danger">{error}</Alert>)
            }
        </Container>
    )
}

export default Upload
