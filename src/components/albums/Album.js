import React, { useState } from 'react'
import { Alert, Button, Spinner, Col, Container, Card, Row } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import useGetAlbum from '../../hooks/useGetAlbum'
import useGetPhotosInAlbum from '../../hooks/useGetPhotosInAlbum'
import PhotoUpload from '../upload/PhotoUpload'
import {SRLWrapper} from "simple-react-lightbox"
import { db } from '../../firebase'
import firebase from 'firebase/app'
import { useAuthContext } from '../../contexts/AuthContext'
import useDeletePhoto from '../../hooks/useDeletePhoto'

const Album = () => {
    const [uploadNewPhotos, setUploadNewPhotos] = useState(false);
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [loadingNewAlbum, setLoadingNewAlbum] = useState(false);
    const [error, setError] = useState(false);
    const [reviewLink, setReviewLink] = useState(null);
    const [deletePhoto, setDeletePhoto] = useState(null);
    
    // Route helpers
    const { albumId } = useParams();
    const navigate = useNavigate();

    // Hooks to get album and photos
    const {album} = useGetAlbum(albumId);
    const {photos, loading} = useGetPhotosInAlbum(albumId);
    useDeletePhoto(deletePhoto, albumId); 

    // Get authenticated user
    const { authUser } = useAuthContext();

    const updateSelectedPhotos = (e) => {
        let photoArray = [];

        // Include photo if checked and doesn't already exist in array
        if (e.target.checked === true) {
            if (selectedPhotos.includes(e.target.id)) {
                return;
            }
            photoArray.push(e.target.id);
            setSelectedPhotos(selectedPhotos.concat(photoArray));
        }

        // Remove photo from selected photos
        if (e.target.checked === false) {
            let filteredArray = selectedPhotos.filter(photo => {
                return photo !== e.target.id
            })
            setSelectedPhotos(filteredArray)
        }
    }

    const handleCreateNewAlbum = async () => {
        const title = prompt('New album title:');

        if (title.length < 3) {
            setError('Title must be at least 3 chars.')
            return; 
        };

        setError(false);
        setLoadingNewAlbum(true);

        try {
            const docRef = await db.collection('albums').add({
                title,
                owner: authUser.uid
            });

            await selectedPhotos.forEach(photo => {
                db.collection('images').doc(photo).update({
                    album: firebase.firestore.FieldValue.arrayUnion(db.collection('albums').doc(docRef.id))
                })
            })

            navigate(`/albums`);
        } catch (err) {
            setError(err.message);
            setLoadingNewAlbum(false);
        }

    }

    const handleCreateReviewLink = (album) => {
        let urlOrigin = window.location.origin
        let url = `${urlOrigin}/review/${album}`;
        setReviewLink(url);
    }

    const handleDeletePhoto = (photo) => {
        if (photo.length > 1) {
                // eslint-disable-next-line no-restricted-globals
                if (confirm(`Are you sure you want to delete all of these \n"${photo.length}" photos?`)) {
                    setDeletePhoto(photo);
                    setSelectedPhotos([]);
            }} else {
                // eslint-disable-next-line no-restricted-globals
                if (confirm(`Are you sure you want to delete photo \n"${photo.name}"?`)) {
                    setDeletePhoto(photo);
            }
        }
    }

    return (
        <Container fluid className="px-4">
            <h2 className="text-center">{album && album.title}</h2>
            <p className="text-center mb-2">{album && album.description}</p>

            <div className="d-flex justify-content-between mb-3">
                <div>
                    <Button variant="dark" onClick={() => {navigate(`/albums/edit/${albumId}`)}}>Edit album info</Button>
                    <Button variant="dark" onClick={() => {handleCreateReviewLink(albumId)}}>Create link for client review</Button>
                </div>

                <Button variant="dark" onClick={() => {setUploadNewPhotos(!uploadNewPhotos)}}>
                    {
                        uploadNewPhotos 
                        ? "Hide uploader" 
                        : "Add photos"
                    }
                </Button>
            </div>

            {
                reviewLink && (
                    <p>Review link: <a href={reviewLink}>{reviewLink}</a></p>
                )
            }

            {
                uploadNewPhotos && (
                    <PhotoUpload albumId={albumId} />
                )
            }
            <SRLWrapper>
                <Row className="justify-content-md-center">
                    {loading
                        ? (
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        )
                        : (
                            photos.map(photo => (
                                <Col xs={12} sm={6} md={4} lg={3} key={photo.id}>
                                    <Card>
                                        <a href={photo.url} >
                                            <Card.Img variant="top" src={photo.url} />
                                        </a>
                                        <Card.Body className="d-flex justify-content-between">
                                            <div>
                                                <input 
                                                    type="checkbox" 
                                                    id={photo.id} 
                                                    name="selected-photo" 
                                                    className="mr-2" 
                                                    onChange={updateSelectedPhotos}
                                                    />
                                                <label htmlFor="selected-photo">Select</label>
                                            </div>
                                            <div>
                                                <Button 
                                                    variant="danger" 
                                                    className="btn-sm" 
                                                    onClick={() => handleDeletePhoto(photo, albumId)}>
                                                        X
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )  
                    }
                </Row>
            </SRLWrapper>

            {
                selectedPhotos.length > 0 && (
                    <div className="text-center mt-3">
                        <p>Selected photos: {selectedPhotos.length}</p>
                        <div className="d-flex justify-content-center">
                            <Button variant="dark" className="mr-3" onClick={handleCreateNewAlbum}>Create new album</Button>
                            <Button variant="danger" onClick={() => handleDeletePhoto(selectedPhotos)}>Delete photos</Button>
                        </div>
                        {
                            error && (
                                <Alert variant="danger">{error}</Alert>
                            )
                        }
                    </div>
                )
            }
        </Container>
    )
}

export default Album
