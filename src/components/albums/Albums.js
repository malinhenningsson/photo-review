import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'
import { useAuthContext } from '../../contexts/AuthContext'
import { Spinner, Container, Card, Row, Col } from 'react-bootstrap'

const Albums = () => {
    const [albums, setAlbums] = useState()
    const [loading, setLoading] = useState(true);
    
    const { authUser } = useAuthContext();

    useEffect(() => {
        const unsubscribe = db.collection('albums').orderBy('title').onSnapshot(snapshot => {
            setLoading(true);
            const snapshotAlbums = [];
            snapshot.forEach(doc => {
                snapshotAlbums.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setAlbums(snapshotAlbums);
            setLoading(false);
        })
        return unsubscribe;
    }, []);

    return (
        <Container fluid className="px-4">
			<h2 className="text-center">Albums</h2>

            <Row className="justify-content-md-center">
                {
                    loading
                        ? (
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        ) : (
                            albums.map((album) => (
                                <Col xs={12} sm={6} md={4} lg={3}>
                                    <Link to={`/albums/${album.id}`} key={album.id}>
                                        <Card>
                                        <Card.Img variant="top" src="holder.js/100px180" />
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


			{ authUser && (
				<div>
					<Link to="/upload" className="btn btn-dark mt-4">Create a new album</Link>
				</div>
			)}
		</Container>
    )
}

export default Albums
