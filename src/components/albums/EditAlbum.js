import React, { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Alert, Container, Spinner } from 'react-bootstrap'
import { useAuthContext } from '../../contexts/AuthContext'
import useGetAlbum from '../../hooks/useGetAlbum';
import { db } from '../../firebase'

const EditAlbum = () => {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const [error, setError] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const { albumId } = useParams();
    const { authUser } = useAuthContext();
    const {album, loading} = useGetAlbum(albumId);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (album.owner !== authUser.uid) {
            return;
        }

        if (titleRef.current.value.length < 3) {
            setError("Title must be at least 3 chars long, please try again.")
            return;
        }

        try {
            setLoadingEdit(true);

            if (album.title !== titleRef.current.value) {
                await db.collection('albums').doc(albumId).update({
                    title: titleRef.current.value
                })
            };
    
            if (album.description !== descriptionRef.current.value) {
                await db.collection('albums').doc(albumId).update({
                    description: descriptionRef.current.value
                })
            };

            setLoadingEdit(false);
            navigate(`/albums/${albumId}`);
        } catch (err) {
            setError("Something went wrong while updating album.");
            setLoadingEdit(false);
        }
    }

    return (
        <Container>
            <h1 className="text-center">Edit album</h1>

            {
                loading 
                ? (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )
                : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="title">
                            <Form.Label>Album title</Form.Label>
                            <Form.Control 
                                type="title" 
                                ref={titleRef}
                                defaultValue={album.title} 
                                required 
                                />
                                {
                                titleRef.current && titleRef.current.value.length < 3 && (
                                    <Form.Text className="text-danger">
                                        Please enter a title at least 3 characters long.
                                    </Form.Text> )
                                }
                        </Form.Group>

                        <Form.Group id="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text" 
                                ref={descriptionRef}
                                defaultValue={album.description}
                                />
                        </Form.Group>

                        <Button variant="dark" disabled={loadingEdit} type="submit">Save</Button>
                    </Form>

                )
            }

            {error && (<Alert variant="danger" className="mt-3">{error}</Alert>)}
        </Container>
    )
}

export default EditAlbum
