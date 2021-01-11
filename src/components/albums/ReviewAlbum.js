import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import firebase from 'firebase/app'
import { db } from '../../firebase'
import useGetAlbum from '../../hooks/useGetAlbum'
import { Alert, Button, Spinner, Col, Container, Card, Row } from 'react-bootstrap'
import {SRLWrapper} from "simple-react-lightbox"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const ReviewAlbum = () => {
    const [likedPhotos, setLikedPhotos] = useState([]);
    const [reviewedPhotos, setReviewedPhotos] = useState([]);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const { albumId } = useParams();
    const navigate = useNavigate();
    const {album, photos, loading} = useGetAlbum(albumId);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Get photos and add to a review array
        async function getPhotos() {
            const photoList = await Promise.all(
                photos.map(photo => {
                    return {
                        id: photo.id, 
                        like: undefined
                    }
                })
            )
            setReviewedPhotos(photoList);
        }
        getPhotos();
    }, [photos]);

    useEffect(() => {
        // Update array with liked photos
        let likedArray = reviewedPhotos.filter(photo => {
            return photo.like === true
        });
        setLikedPhotos(likedArray);

        // Check if all photos have been reviewed, if true set disabled button to false
        let result = reviewedPhotos.every(photo => photo.like !== undefined);
        if (result === false) {
            setDisabledBtn(true);
            return;
        } else if (result === true) {
            setDisabledBtn(false);
        }
    }, [reviewedPhotos])

    const updatePhotoReaction = (photo, reaction) => {
        // Map over reviewed photos and update like reaction
        let updatedArray = reviewedPhotos.map(item => {
            if (item.id === photo.id) {
                return {
                    id: item.id,
                    like: reaction
                }
            } else {
                return item;
            }
        })
        setReviewedPhotos(updatedArray);
    }

    const handleSendReview = async () => {
        console.log('sent review', reviewedPhotos);
        const title = `${album.title}-${Date.now()}`;

        setError(false);

        try {
            const docRef = await db.collection('albums').add({
                title,
                owner: album.owner
            });

            await likedPhotos.forEach(photo => {
                db.collection('images').doc(photo.id).update({
                    album: firebase.firestore.FieldValue.arrayUnion(db.collection('albums').doc(docRef.id))
                })
            })

            navigate(`/review/thanks`);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <Container fluid className="px-4">
            <h2 className="text-center">Review for: {album && album.title}</h2>
            <p className="text-center mb-2">{album && album.description}</p>

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
                                            <button 
                                                style={{ border: "none", backgroundColor: "transparent" }} 
                                                onClick={() => updatePhotoReaction(photo, true)}
                                                >
                                                    <FontAwesomeIcon 
                                                        icon={faThumbsUp}
                                                        style={{ color: "green", fontSize: "1.5em", margin: "0 0.5em" }} 
                                                        />
                                            </button>

                                            <button 
                                                style={{ border: "none", backgroundColor: "transparent" }} 
                                                onClick={() => updatePhotoReaction(photo, false)}
                                                >
                                                    <FontAwesomeIcon 
                                                        icon={faThumbsDown} 
                                                        style={{ color: "red", fontSize: "1.5em", margin: "0 0.5em"}} 
                                                        />
                                            </button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )  
                    }
                </Row>
            </SRLWrapper>

            {
                reviewedPhotos && likedPhotos.length > 0 && (
                    <div className="text-center mt-3">
                        <p>Liked photos: {likedPhotos.length} / {photos.length}</p>
                        <div className="d-flex justify-content-center">
                            <Button 
                                disabled={disabledBtn} 
                                variant="dark" 
                                className="mr-3" 
                                onClick={handleSendReview}>
                                    Send Review
                            </Button>
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

export default ReviewAlbum
