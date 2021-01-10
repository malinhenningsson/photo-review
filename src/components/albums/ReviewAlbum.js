import React, { useEffect, useState } from 'react'
import { Alert, Button, Spinner, Col, Container, Card, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import useGetAlbum from '../../hooks/useGetAlbum'
import {SRLWrapper} from "simple-react-lightbox"
import { db } from '../../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase/app'

const ReviewAlbum = () => {
    const [likedPhotos, setLikedPhotos] = useState([]);
    const { albumId } = useParams();
    const {album, photos, loading} = useGetAlbum(albumId);
    const [error, setError] = useState(false);


    // useEffect(() => {
    //     async function getPhotos() {
    //         const photoList = await Promise.all(
    //             photos.map(photo => {
    //                 return photo.id
    //             })
    //         )
    //         setLikedPhotos(photoList);
    //     }
    //     getPhotos();
    // }, [photos]);

    const addLikedPhoto = (photo) => {
        let likedArray = [];
        if (likedPhotos.includes(photo)) {
            return;
        }
        likedArray.push(photo);
        setLikedPhotos(likedPhotos.concat(likedArray));
    }

    const removeLikedPhoto = (photo) => {
        console.log('removing photo: ', photo)
        if (!likedPhotos.includes(photo)) {
            return;
        }
        let filteredArray = likedPhotos.filter(item => {
            return item !== photo
        })
        setLikedPhotos(filteredArray);
    } 


    const handleSendReview = async () => {
        console.log('sent review', likedPhotos);
        const title = `${album.title}-${Date.now()}`;

        // setError(false);
        // setLoading(true);

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

            // navigate(`/albums`);
        } catch (err) {
            setError(err.message);
            console.error(err);
            // setLoading(false);
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
                                                onClick={() => addLikedPhoto(photo)}>
                                                    <FontAwesomeIcon 
                                                        icon={faThumbsUp}
                                                        style={{ color: "green", fontSize: "1.5em", margin: "0 0.5em" }} 
                                                        />
                                            </button>

                                            <button 
                                                style={{ border: "none", backgroundColor: "transparent" }} 
                                                onClick={() => removeLikedPhoto(photo)}>
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
                likedPhotos && likedPhotos.length > 0 && (
                    <div className="text-center mt-3">
                        <p>Liked photos: {likedPhotos.length} / {photos.length}</p>
                        <div className="d-flex justify-content-center">
                            <Button variant="dark" className="mr-3" onClick={handleSendReview}>Send Review</Button>
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
