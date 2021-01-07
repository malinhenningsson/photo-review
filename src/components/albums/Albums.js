import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { Spinner, Container, Card, Row, Col } from 'react-bootstrap'
import DefaultPhoto from '../../assets/images/default-image-album.png'
import useGetAlbums from '../../hooks/useGetAlbums';

const Albums = () => {
    const { albums, loading } = useGetAlbums();
    const { authUser } = useAuthContext();

    return (
        <Container fluid className="px-4">
			<h2 className="text-center">Albums</h2>

            { authUser && (
				<div className="text-center mb-4">
					<Link to="/upload" className="btn btn-dark mt-4">Create a new album</Link>
				</div>
			)}

            <Row className="justify-content-md-center">
                {
                    loading
                        ? (
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        ) : (
                            albums.map((album) => (
                                <Col key={album.id} xs={12} sm={6} md={4} lg={3}>
                                    <Link to={`/albums/${album.id}`}>
                                        <Card>
                                        <Card.Img variant="top" src={DefaultPhoto} />
                                        <Card.Body>
                                            <Card.Title>{album.title}</Card.Title>
                                        </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            ))
                        )
                }
            </Row>
		</Container>
    )
}

export default Albums
