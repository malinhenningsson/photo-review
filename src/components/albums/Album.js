import React, { useState } from 'react'
import { Button, Spinner, Col, Container, Card, Row } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import useGetAlbum from '../../hooks/useGetAlbum'
import PhotoUpload from '../upload/PhotoUpload'
import {SRLWrapper} from "simple-react-lightbox";

const Album = () => {
    const [uploadNewPhotos, setUploadNewPhotos] = useState(false);
    const { albumId } = useParams();
    const {album, photos, loading} = useGetAlbum(albumId);
    const navigate = useNavigate();

    return (
        <Container fluid className="px-4">
            <h2 className="text-center">{album && album.title}</h2>
            <p className="text-center mb-2">{album && album.description}</p>

            <div className="d-flex justify-content-between mb-3">
                <Button variant="dark" onClick={() => {navigate(`/albums/edit/${albumId}`)}}>Edit album info</Button>
                <Button variant="dark" onClick={() => {setUploadNewPhotos(!uploadNewPhotos)}}>
                    {
                        uploadNewPhotos 
                        ? "Hide uploader" 
                        : "Add photos"
                    }
                </Button>
            </div>

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
                                    </Card>
                                </Col>
                            ))
                        )  
                    }
                </Row>
            </SRLWrapper>
        </Container>
    )
}

export default Album
