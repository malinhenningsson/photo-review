import React from 'react'
import { Spinner, Col, Container, Card, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import useGetAlbum from '../../hooks/useGetAlbum'
import PhotoUpload from '../upload/PhotoUpload'

const Album = () => {
    const { albumId } = useParams();
    const {album, photos, loading} = useGetAlbum(albumId);

    return (
        <Container fluid className="px-4">
            <h2 className="text-center">{album && album.title}</h2>
            <p className="text-center mb-2">{album && album.description}</p>

            <PhotoUpload albumId={albumId} />

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
        </Container>
    )
}

export default Album