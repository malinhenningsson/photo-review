import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { Container, Card, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import DefaultFolder from '../../assets/images/default-folder-2.png'
import useGetAlbums from '../../hooks/useGetAlbums';
import useDeleteAlbum from '../../hooks/useDeleteAlbum'
import LoadingSpinner from '../LoadingSpinner'

const Albums = () => {
    const [deleteAlbum, setDeleteAlbum] = useState(null);
    const { albums, loading } = useGetAlbums();
    const { authUser } = useAuthContext();
    useDeleteAlbum(deleteAlbum);

    const handleDeleteAlbum = (album) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure you want to delete album \n"${album.title}"?`)) {
            setDeleteAlbum(album);
        }
    }

    return (
        <>
            <header>
			    <h1 className="text-center">Albums</h1>
                { authUser && (
                    <div className="text-center mb-4">
                        <Link to="/upload" className="btn btn-standard">Create a new album</Link>
                    </div>
                )}
            </header>

            <Container fluid className="px-4 mt-4 mb-5">
                <Row className="justify-content-md-center my-4">
                    {
                        loading
                            ? (
                                <LoadingSpinner />
                            ) : (
                                albums.map((album) => (
                                    <Col key={album.id} xs={12} sm={6} md={4} lg={3}>
                                        <Card>
                                            <Link to={`/albums/${album.id}`}>
                                                <Card.Img variant="top" src={DefaultFolder} />
                                            </Link>
                                            <Card.Body className="d-flex justify-content-between">
                                                <Link to={`/albums/${album.id}`} style={{ color: "#fff"}}>
                                                    <Card.Title>
                                                        {album.title}
                                                    </Card.Title>
                                                </Link>
                                                <button 
                                                    style={{ border: "none", backgroundColor: "transparent", color: "#fff" }} 
                                                    onClick={() => handleDeleteAlbum(album)}>
                                                        <FontAwesomeIcon 
                                                            icon={faTrashAlt}
                                                        />
                                                </button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            )
                    }
                </Row>
            </Container>
        </>
    )
}

export default Albums
